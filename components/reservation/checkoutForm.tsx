"use client";

import React, { useRef, useState } from "react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { ClockIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { createChatRoom } from "@/app/[locale]/(main)/contact-guide/[guideId]/actions";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "../errorText";
import { supabase } from "@/lib/supabaseClient";
import { reserveGuide } from "@/app/[locale]/(main)/reservation/[guideId]/actions";
import {
  reservationSchema,
  ReservationType,
} from "@/app/[locale]/(main)/reservation/[guideId]/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../hooks/use-toast";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LoadingOverlay } from "../loading-overlay";

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
  guideId,
  userId,
  username,
  avatar,
  startTime,
  endTime,
}: CheckoutFormProps) {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [customerAgeRange, setCustomerAgeRange] = useState("");

  const otherUserChannel = useRef<RealtimeChannel>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReservationType>({
    resolver: zodResolver(reservationSchema(t)),
  });

  const onValid = async (data: ReservationType) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("payload", data.payload);
      formData.append("customerAgeRange", data.customerAgeRange);
      const [{ ok, error, chatRoom, messageId }, reserveResult] =
        await Promise.all([
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
      otherUserChannel.current = supabase.channel(
        `user-${chatRoom.otherUserId}`
      );

      otherUserChannel.current.send({
        type: "broadcast",
        event: "message",
        payload: {
          id: messageId,
          chatRoomId: chatRoom.id,
          message: data.payload,
          user: {
            id: userId,
            username,
            avatar,
          },
          isMyMessage: true,
          createdAt: new Date().toISOString(),
          avatar,
          usernameOrFullname: username,
          isRead: false,
        },
      });
      router.push(`/payment-success/${reserveResult.reservation.id}`);
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
      {loading && <LoadingOverlay />}
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold">
          {t("reservation.paymentMethod")}
        </div>
        <span>{t("reservation.paymentMethodDescription")}</span>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-row">
          <div className="text-xl font-semibold">
            {t("reservation.customerAgeRange")}
          </div>
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
                <p>{t("reservation.customerAgeRangeDescription")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          {errors?.customerAgeRange ? (
            <ErrorText text={errors.customerAgeRange.message!} />
          ) : null}
          <select
            className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-44 focus:outline-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm  ${
              customerAgeRange ? "" : "text-muted-foreground"
            }`}
            value={customerAgeRange}
            onChange={handleStartTimeChange}
          >
            <option value="" disabled hidden>
              {t("reservation.addAgeRange")}
            </option>
            <option value="20~25" className="text-black">
              20~25{t("reservation.year")}
            </option>
            <option value="26~30" className="text-black">
              26~30{t("reservation.year")}
            </option>
            <option value="31~35" className="text-black">
              31~35{t("reservation.year")}
            </option>
            <option value="36~40" className="text-black">
              36~40{t("reservation.year")}
            </option>
            <option value="41~45" className="text-black">
              41~45{t("reservation.year")}
            </option>
            <option value="46~50" className="text-black">
              46~50{t("reservation.year")}
            </option>
            <option value="51~55" className="text-black">
              51~55{t("reservation.year")}
            </option>
            <option value="56~60" className="text-black">
              56~60{t("reservation.year")}
            </option>
          </select>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            {t("reservation.guideMessage")}
          </span>
          <span className="text-sm text-muted-foreground">
            {t("reservation.guideMessageDescription")}
          </span>
        </div>
        {errors?.payload ? <ErrorText text={errors.payload.message!} /> : null}
        <Textarea id="payload" {...register("payload")} required />
      </div>
      <Separator className="my-8" />

      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">
          {t("reservation.refundPolicy")}
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("reservation.refundPolicyDescription")}
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("reservation.refundPolicyDescription2")}
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("reservation.refundPolicyDescription3")}
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("reservation.refundPolicyDescription4")}
          </p>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">
          {t("reservation.basicRules")}
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("reservation.basicRulesDescription1")}
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("reservation.basicRulesDescription3")}
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("reservation.basicRulesDescription4")}
          </p>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-row items-center gap-2">
        <ClockIcon className="size-10" />
        <span>{t("reservation.basicRulesDescription5")}</span>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="text-sm text-muted-foreground">
          {t("reservation.agreeDescription")}
        </div>
      </div>
      <Button disabled={loading} className="w-full font-bold mt-3">
        {t("reservation.requestReservation")}
      </Button>
    </form>
  );
}
