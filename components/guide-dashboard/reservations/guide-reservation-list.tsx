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
import { useGuideReservationStore } from "@/store/useGuideReservationStore";

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
  pickupPlaceMain: string;
  pickupPlaceDetail: string;
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
  const { setReject, setConfirm } = useGuideReservationStore();

  const convertDate = (startTime: string) => {
    const userLocale = navigator.language.split("-")[0] || "ko"; // "ko" or "en" 같은 값만 남김
    const date = convertToVietnamISO(startTime);
    if (date) {
      const formattedDate = convertMonthDayIntl(date, userLocale);
      return formattedDate;
    }
  };
  const handleReject = async (reservationId: number) => {
    setRejectLoading(true);

    const { ok, error } = await cancelReservation(reservationId);
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
      return;
    }
    setReject(reservationId);
    setRejectLoading(false);
  };

  const handleConfirm = async (reservationId: number) => {
    setConfirmLoading(true);
    const { ok, error } = await confirmReservation(reservationId);
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
      return;
    }
    setConfirm(reservationId);
    setConfirmLoading(false);
  };
  return (
    <div className="flex flex-col gap-5">
      {reservationList.map((reservation) => (
        <Card key={reservation.id} className="shadow-md max-w-full p-6 h-fit">
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
                          onClick={() => handleReject(reservation.id)}
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
                          onClick={() => handleConfirm(reservation.id)}
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
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
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
            <div>
              <div className="font-semibold">유저명</div>
              <span className="mr-1">{reservation.user.username}</span>
              <span>
                <span>{`(${reservation.customerAgeRange})`}</span>
              </span>
            </div>
            <div>
              <div className="font-semibold">예약 날짜</div>
              <span>{convertDate(reservation.startTime)}</span>
            </div>
            <div>
              <div className="font-semibold">예약 시간</div>
              <span>
                {`${convertToVietnamTime(
                  reservation.startTime
                )} ~ ${convertToVietnamTime(reservation.endTime)}`}
              </span>
            </div>
            <div>
              <div className="font-semibold">픽업 위치</div>
              <div className="flex flex-col">
                <div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      reservation.pickupPlaceMain
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    <span>{reservation.pickupPlaceMain}</span>
                  </a>
                </div>
                <span className="text-sm text-muted-foreground">
                  {reservation.pickupPlaceDetail}
                </span>
              </div>
            </div>
            <div>
              <div className="font-semibold">요금</div>
              <div>
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
        </Card>
      ))}
    </div>
  );
}
