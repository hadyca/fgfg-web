"use client";

import React, { useRef, useState } from "react";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  paymentIntentId: string;
  clientSecret: string;
}

export default function CheckoutForm({
  guideId,
  userId,
  username,
  avatar,
  email,
  startTime,
  endTime,
  paymentIntentId,
  clientSecret,
}: CheckoutFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

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

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://www.localhost:3000/payment-success`,
        },
        redirect: "if_required",
      });
      console.log("최종페이", paymentIntent);
      if (error) {
        toast({
          variant: "destructive",
          title: "카드 정보를 다시 확인해주세요.",
        });
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("payload", data.payload);
      formData.append("customerAgeRange", data.customerAgeRange);
      const [chatRoom, reserveResult] = await Promise.all([
        createChatRoom(formData, guideId), // 채팅방 생성
        reserveGuide(formData, guideId, startTime, endTime, paymentIntentId), // 가이드 예약
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
      router.push("/payment-success");
    } catch (err) {
      console.log(err);
      setLoading(false);
      return;
    }

    // 모든 작업이 성공적으로 완료되면 로딩 상태 해제
    setLoading(false);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as any;
    setValue("customerAgeRange", value);
    setCustomerAgeRange(value);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">결제 수단</div>
        <PaymentElement />
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
            className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-36 focus:outline-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm  ${
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
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            가이드에게 메시지 보내기
          </span>
          <span className="text-sm text-muted-foreground">
            고객님께서 원하시는 데이트 코스, 가이드가 필요한 준비물, 가이드를
            선택한 이유 등을 알려주세요.
          </span>
        </div>
        {errors?.payload ? <ErrorText text={errors.payload.message!} /> : null}
        <Textarea id="payload" {...register("payload")} required />
      </div>
      <Separator className="my-8" />

      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">환불 정책</div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            가이드 요청으로 인한 예약 취소나 가이드가 예약을 이행하지 않은
            경우(No Show)에는 전액 환불해드립니다.
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            고객님이 예약 시간에 나타나지 않은 경우(No Show), 환불이
            불가능합니다.
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            가이드가 예약을 확정한 이후에는 예약 취소 및 환불이 불가능합니다.
          </p>
        </div>

        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            단순히 가이드 서비스에 대한 불만족으로 인한 환불은 불가능합니다.
          </p>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">기본 규칙</div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            가이드가 안전하게 가이드를 진행할 수 있도록 협조 부탁드립니다.
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            스킨쉽은 손잡기와 팔짱끼기만 허용 됩니다.
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            가이드 코스는 숙박업체를 제외한 다양한 장소를 포함하여 진행됩니다.
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            추가 연장 시간에 대한 결제는 fgfg 공식 사이트를 통해서만 진행됩니다.
          </p>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-row items-center gap-2">
        <ClockIcon className="size-10" />
        <span>
          가이드가 48시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된
          것이 아닙니다. 만약 예약이 거절된다면, 요금은 자동 환불 됩니다.
        </span>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="text-sm text-muted-foreground">
          아래 버튼을 선택하면 fgfg가 정한
          <Link href={"/policies/terms-and-conditions"}>
            <span className="text-primary"> 이용 약관 </span>
          </Link>
          및
          <Link href={"/policies/refund-policy"}>
            <span className="text-primary"> 환불 정책</span>
          </Link>
          에 동의하며, 본인에게 책임이 있는 피해가 발생할 경우 fgfg가 결제
          수단을 통해 청구할 수 있다는 점에 동의하는 것입니다. 가이드가 예약
          요청을 수락하면 표시된 요금에 대해 결제가 이루어짐에 동의합니다.
        </div>
      </div>
      <Button disabled={!stripe || loading} className="w-full font-bold mt-3">
        {!loading ? "예약 요청" : "로딩 중..."}
      </Button>
    </form>
  );
}
