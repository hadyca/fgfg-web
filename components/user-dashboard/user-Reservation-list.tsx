"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import {
  calculateAge,
  calculateGapTimeISO,
  convertMonthDayIntl,
  convertToVietnamISO,
  convertToVietnamTime,
  formatCurrency,
} from "@/lib/utils";
import { SERVICE_FEE } from "@/lib/constants";
import { Button } from "../ui/button";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import { cancelReservation } from "@/app/(main)/user-dashboard/reservations/actions";

interface MainGuidePhoto {
  fileUrl: string;
}

interface Guide {
  fullname: string;
  birthdate: string;
  mainGuidePhoto: MainGuidePhoto;
}

interface Reservations {
  id: number;
  guide: Guide;
  startTime: string;
  endTime: string;
  guideConfirm: boolean;
  userCancel: boolean;
  guideCancel: boolean;

  createdAt: string;
  serviceFee: number;
}

interface UpcomingReservationsProps {
  reservationList: Reservations[];
}

export default function UserReservationList({
  reservationList,
}: UpcomingReservationsProps) {
  const [loading, setLoading] = useState(false);

  const convertDate = (startTime: string) => {
    const userLocale = navigator.language.split("-")[0] || "ko"; // "ko" or "en" 같은 값만 남김
    const date = convertToVietnamISO(startTime);
    if (date) {
      const formattedDate = convertMonthDayIntl(date, userLocale);
      return formattedDate;
    }
  };
  const handleContinueDialog = async (reservationId: number) => {
    setLoading(true);
    await cancelReservation(reservationId);
    setLoading(false);
    window.location.reload();
  };
  return (
    <div className="flex flex-col gap-5">
      {reservationList.map((reservation) => (
        <Card key={reservation.id} className="shadow-md max-w-full p-6 h-fit">
          <div className="flex flex-row items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              예약번호:{reservation.id}
            </span>
            {reservation.guideConfirm ? (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-md">
                <CheckCircleIcon className="h-5 w-5 text-green-700" />
                <span className="font-semibold">예약 확정</span>
              </div>
            ) : reservation.userCancel || reservation.guideCancel ? (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-md">
                <XCircleIcon className="h-5 w-5 text-red-700" />
                <span className="font-semibold">예약 취소됨</span>
              </div>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={loading}>
                    {loading ? "로딩 중..." : "예약 취소"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle>예약을 취소하시겠어요?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>아니요</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleContinueDialog(reservation.id)}
                    >
                      확인
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <div className="flex flex-row gap-3">
            <div className="relative size-32 rounded-md overflow-hidden flex-shrink-0">
              <Image
                fill
                src={`${reservation.guide.mainGuidePhoto.fileUrl}/mainphoto`}
                alt={"guide main photo"}
                className="object-cover"
                sizes="128px"
                priority
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <span>{reservation.guide.fullname}</span>
                <span>님</span>
                <span>
                  <span>({calculateAge(reservation.guide.birthdate)}세)</span>
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
