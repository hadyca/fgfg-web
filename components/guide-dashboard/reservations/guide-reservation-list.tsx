"use client";

import { Card } from "../../ui/card";
import {
  calculateGapTimeISO,
  convertMonthDayIntl,
  convertToVietnamISO,
  convertToVietnamTime,
  formatCurrency,
} from "@/lib/utils";
import { SERVICE_FEE } from "@/lib/constants";
import { Button } from "../../ui/button";
import {
  CheckCircleIcon,
  UserCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/components/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  cancelReservation,
  confirmReservation,
} from "@/app/(main)/(onlyGuide)/guide-dashboard/(dashboard)/reservations/actions";

interface User {
  avatar: string;
  username: string;
}

interface Reservations {
  id: number;
  user: User;
  startTime: string;
  endTime: string;
  guideConfirm: boolean;
  userCancel: boolean;
  guideCancel: boolean;
  createdAt: string;
  serviceFee: number;
  customerAgeRange: string;
  paymentIntentId: string;
}

interface UpcomingReservationsProps {
  reservationList: Reservations[];
  selected: string;
}

export default function GuideReservationList({
  reservationList,
  selected,
}: UpcomingReservationsProps) {
  const { toast } = useToast();

  const [rejectLoading, setRejectLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const convertDate = (startTime: string) => {
    const userLocale = navigator.language.split("-")[0] || "ko"; // "ko" or "en" 같은 값만 남김
    const date = convertToVietnamISO(startTime);
    if (date) {
      const formattedDate = convertMonthDayIntl(date, userLocale);
      return formattedDate;
    }
  };
  const handleReject = async (
    reservationId: number,
    paymentIntentId: string
  ) => {
    setRejectLoading(true);
    try {
      const response = await fetch("/api/cancel-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentIntentId }),
      });

      const result = await response.json();

      if (result.success) {
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("예약 거절 오류:", error);
      return;
    }

    const { ok, error } = await cancelReservation(reservationId);
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
      return;
    }
    setRejectLoading(false);
    window.location.reload();
  };

  const handleConfirm = async (
    reservationId: number,
    paymentIntentId: string
  ) => {
    setConfirmLoading(true);
    try {
      const response = await fetch("/api/capture-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentIntentId }),
      });

      const result = await response.json();

      if (result.success) {
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("결제 확정 오류:", error);
      return;
    }

    const { ok, error } = await confirmReservation(reservationId);
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
      return;
    }
    setConfirmLoading(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-5">
      {reservationList.map((reservation) => (
        <Card key={reservation.id} className="shadow-md max-w-full p-6 h-60">
          <div className="flex flex-row items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              예약번호:{reservation.id}
            </span>
            {selected === "upcoming" ? (
              reservation.guideConfirm ? (
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-md">
                  <CheckCircleIcon className="h-5 w-5 text-green-700" />
                  <span className="font-semibold">예약 확정</span>
                </div>
              ) : (
                <div className="flex flex-row gap-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={rejectLoading || confirmLoading}
                        variant={"outline"}
                      >
                        {rejectLoading ? "로딩 중..." : "거절"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          예약을 거절하시겠어요?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>아니요</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleReject(
                              reservation.id,
                              reservation.paymentIntentId
                            )
                          }
                        >
                          확인
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button disabled={rejectLoading || confirmLoading}>
                        {confirmLoading ? "로딩 중..." : "수락"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          예약을 수락하시겠어요?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>아니요</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleConfirm(
                              reservation.id,
                              reservation.paymentIntentId
                            )
                          }
                        >
                          확인
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )
            ) : selected === "completed" ? (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-md">
                <CheckCircleIcon className="h-5 w-5 text-green-700" />
                <span className="font-semibold">예약 확정</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-md">
                <XCircleIcon className="h-5 w-5 text-red-700" />
                <span className="font-semibold">예약 취소됨</span>
              </div>
            )}
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex items-center h-32">
              <Avatar className="size-16">
                {reservation.user.avatar ? (
                  <>
                    <AvatarImage
                      src={`${reservation.user.avatar}/avatar`}
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      <UserCircleIcon className="text-primary w-full h-full" />
                    </AvatarFallback>
                  </>
                ) : (
                  <UserCircleIcon className="text-primary w-full h-full" />
                )}
              </Avatar>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <span className="mr-1">{reservation.user.username}</span>
                <span>
                  <span>{`(${reservation.customerAgeRange})`}</span>
                </span>
              </div>
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center border-r border-gray-300 pr-4">
                  <span>예약 날짜</span>
                  <span>{convertDate(reservation.startTime)}</span>
                </div>
                <div className="flex flex-col items-center pl-4">
                  <span>예약 시간</span>
                  <div>
                    <span>{convertToVietnamTime(reservation.startTime)}</span>
                    <span>~</span>
                    <span>{convertToVietnamTime(reservation.endTime)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="pr-2">요금:</div>
                <div>
                  <div className="flex justify-between">
                    <span className="underline">
                      {`${formatCurrency(SERVICE_FEE)} x ${calculateGapTimeISO(
                        reservation.startTime,
                        reservation.endTime
                      )}시간`}
                    </span>
                    <span>={formatCurrency(reservation.serviceFee)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
