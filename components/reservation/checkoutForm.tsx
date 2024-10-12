"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { ClockIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { createChatRoom } from "@/app/(main)/contact-guide/[guideId]/actions";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "../errorText";
import { supabase } from "@/lib/supabaseClient";
import { reserveGuide } from "@/app/(main)/reservation/[guideId]/actions";
import Spinner from "../ui/spinner";
import {
  reservationSchema,
  ReservationType,
} from "@/app/(main)/reservation/[guideId]/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../hooks/use-toast";

interface CheckoutFormProps {
  amount: number;
  isMe: boolean;
  guideId: number;
  userId: number;
  username: string;
  avatar: string;
  email: string;
  startTime: string;
  endTime: string;
}

export default function CheckoutForm({
  amount,
  isMe,
  guideId,
  userId,
  username,
  avatar,
  email,
  startTime,
  endTime,
}: CheckoutFormProps) {
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerAgeRange, setCustomerAgeRange] = useState("");

  const messageChannel = useRef<RealtimeChannel>();
  const otherUserChannel = useRef<RealtimeChannel>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReservationType>({
    resolver: zodResolver(reservationSchema),
  });

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const onValid = async (data: ReservationType) => {
    setLoading(true);

    try {
      // Stripe가 초기화되었는지 확인
      if (!stripe || !elements) {
        throw new Error("Stripe or Elements not initialized");
      }

      // 결제 폼 제출 및 Stripe 결제 먼저 처리
      const submitResponse = await elements.submit();
      const { error: submitError } = submitResponse || {};

      // 결제 폼 제출 결과 확인
      if (submitError) {
        throw new Error(submitError.message);
      }

      const formData = new FormData();
      formData.append("payload", data.payload);
      formData.append("customerAgeRange", data.customerAgeRange);
      const [chatRoom, reserveResult] = await Promise.all([
        createChatRoom(formData, guideId), // 채팅방 생성
        reserveGuide(formData, guideId, startTime, endTime), // 가이드 예약
      ]);

      if (!reserveResult.ok) {
        toast({
          variant: "destructive",
          title: reserveResult.error,
        });
        return;
      }

      // 채널 생성 후 메시지 전송
      messageChannel.current = supabase.channel(`room-${chatRoom.id}`);
      otherUserChannel.current = supabase.channel(
        `user-${chatRoom.otherUserId}`
      );

      const newMessage = {
        id: Date.now(),
        payload: data.payload,
        createdAt: new Date().toISOString(),
        user: {
          id: userId,
          username,
          avatar,
        },
        isMyMessage: true,
      };

      // 상대방 채팅방에 메시지 전달
      messageChannel.current?.send({
        type: "broadcast",
        event: "message",
        payload: newMessage,
      });

      otherUserChannel.current?.send({
        type: "broadcast",
        event: "message",
        payload: {
          chatRoomId: chatRoom.id,
          message: data.payload,
          createdAt: newMessage.createdAt,
          usernameOrFullname: username,
          isRead: false,
        },
      });

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
          receipt_email: email,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      // 에러가 발생하면 여기서 처리하고 나머지 함수 실행 중지
      setErrorMessage(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setLoading(false);
      return;
    }

    // 모든 작업이 성공적으로 완료되면 로딩 상태 해제
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as any;
    setValue("customerAgeRange", value);
    setCustomerAgeRange(value);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">결제 수단</div>
        {clientSecret && <PaymentElement />}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-row">
          <div className="text-xl font-semibold">고객님 연령대</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트가 상위 form에 전달되지 않도록 막음
                }}
              >
                <ExclamationCircleIcon className="size-6 text-primary" />
              </TooltipTrigger>
              <TooltipContent>
                <p>가이드에게 미리 제공해야 할 정보입니다.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          {errors?.customerAgeRange ? (
            <ErrorText text={errors.customerAgeRange.message!} />
          ) : null}
          <select
            className={`w-36 focus:outline-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm  ${
              customerAgeRange ? "" : "text-muted-foreground"
            }`}
            value={customerAgeRange}
            onChange={handleStartTimeChange}
          >
            <option value="" disabled hidden>
              연령대 추가
            </option>
            <option value="20~25세" className="text-black">
              20~25세
            </option>
            <option value="26~30세" className="text-black">
              26~30세
            </option>
            <option value="31~35세" className="text-black">
              31~35세
            </option>
            <option value="36~40세" className="text-black">
              36~40세
            </option>
            <option value="41~45세" className="text-black">
              41~45세
            </option>
            <option value="46~50세" className="text-black">
              46~50세
            </option>
            <option value="51~55세" className="text-black">
              51~55세
            </option>
            <option value="56~60세" className="text-black">
              56~60세
            </option>
            <option value="60세 이상" className="text-black">
              60세 이상
            </option>
          </select>
        </div>
      </div>
      <Separator className="my-8" />

      {!isMe ? (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-xl font-semibold">
                가이드에게 메시지 보내기
              </span>
              <span className="text-sm text-muted-foreground">
                고객님께서 원하시는 데이트 코스, 가이드가 필요한 준비물,
                가이드를 선택한 이유 등을 알려주세요.
              </span>
            </div>
            {errors?.payload ? (
              <ErrorText text={errors.payload.message!} />
            ) : null}
            <Textarea id="payload" {...register("payload")} required />
          </div>
          <Separator className="my-8" />
        </>
      ) : null}
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">환불 정책</div>
        <div>
          <div className="relative pl-3">
            <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
              고객님의 No Show 시에는 환불이 불가합니다.
            </p>
          </div>
          <div className="relative pl-3">
            <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
              가이드가 예약을 확정한 이후에는 예약 취소 및 환불이 불가합니다.
            </p>
          </div>
          <div className="relative pl-3">
            <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
              가이드 요청에 의한 예약 취소 및 가이드가 예약을 이행하지 않은
              경우(No Show)에는 전액 환불을 해드립니다.
            </p>
          </div>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">기본 규칙</div>
        <div>기본 규칙 내용~~</div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-row items-center gap-2">
        <ClockIcon className="size-10" />
        <span>
          가이드가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된
          것이 아닙니다. 예약 확정 전까지는 요금이 청구되지 않습니다.
        </span>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="text-sm text-muted-foreground">
          아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 게스트에게
          적용되는 기본 규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에
          대한 책임이 본인에게 있을 경우 에어비앤비가 결제 수단으로 청구의
          조치를 취할 수 있다는 사실에 동의하는 것입니다. 호스트가 예약 요청을
          수락하면 표시된 총액이 결제되는 데 동의합니다.
        </div>
      </div>
      <Button disabled={!stripe || loading} className="w-full font-bold mt-3">
        {!loading ? "예약 요청" : "로딩 중..."}
      </Button>
    </form>
  );
}
