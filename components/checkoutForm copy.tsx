"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { boolean } from "zod";
import { Textarea } from "./ui/textarea";
import { ClockIcon } from "@heroicons/react/24/outline";
import { createChatRoom } from "@/app/(main)/contact-guide/[guideId]/actions";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import {
  contactGuideSchema,
  ContactGuideType,
} from "@/app/(main)/contact-guide/[guideId]/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "./errorText";
import { supabase } from "@/lib/supabaseClient";
import { reserveGuide } from "@/app/(main)/reservation/[guideId]/actions";

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
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const messageChannel = useRef<RealtimeChannel>();
  const otherUserChannel = useRef<RealtimeChannel>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactGuideType>({
    resolver: zodResolver(contactGuideSchema),
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

 
  const onValid = async (data: ContactGuideType) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("payload", data.payload);
    const chatRoom = await createChatRoom(formData, guideId);
    messageChannel.current = supabase.channel(room-${chatRoom.id});
    otherUserChannel.current = supabase.channel(user-${chatRoom.otherUserId});
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
    //상대방 채팅방에 전달 하는 정보
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
    await reserveGuide(guideId, startTime, endTime);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: http://www.localhost:3000/payment-success?amount=${amount},
        receipt_email: email, //유저이메일 부분, 추 후 stripe에서 수정
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your return_url.
    }
    setLoading(false);
  };
  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">결제 수단</div>
        {clientSecret && <PaymentElement />}
        {errorMessage && <div>{errorMessage}</div>}
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
        <div>환불 정책 내용~~</div>
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
