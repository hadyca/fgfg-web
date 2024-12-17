"use client";

import Image from "next/image";
import { Card } from "../../ui/card";
import {
  calculateAge,
  calculateGapTimeISO,
  convertMonthDayIntl,
  convertToVietnamISO,
  convertToVietnamTime,
  formatCurrency,
} from "@/lib/utils";
import { SERVICE_FEE } from "@/lib/constants";
import { Button } from "../../ui/button";
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
} from "../../ui/alert-dialog";
import { useState } from "react";
import { cancelReservation } from "@/app/[locale]/(main)/user-dashboard/reservations/actions";
import { useToast } from "@/components/hooks/use-toast";
import Link from "next/link";
import { useUserReservationStore } from "@/store/useUserReservationStore";

interface MainGuidePhoto {
  fileUrl: string;
}

interface Guide {
  id: number;
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
  pickupPlaceMain: string;
  pickupPlaceDetail: string;
}

interface UserReservationListProps {
  reservationList: Reservations[];
  selected: string;
}

export default function UserReservationList({
  reservationList,
  selected,
}: UserReservationListProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { setCancel } = useUserReservationStore();

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

    const { ok, error } = await cancelReservation(reservationId);
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
      return;
    }
    setCancel(reservationId);
    setLoading(false);
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={loading}>
                      {loading ? "로딩 중..." : "예약 취소"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        예약을 취소하시겠어요?
                      </AlertDialogTitle>
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
          <div className="flex flex-col justify-between gap-3">
            <div className="relative size-32 rounded-md overflow-hidden flex-shrink-0">
              <Link href={`/guide-profile/${reservation.guide.id}`}>
                <Image
                  fill
                  src={`${reservation.guide.mainGuidePhoto.fileUrl}/mainphoto`}
                  alt={"guide main photo"}
                  className="object-cover"
                  sizes="128px"
                  priority
                />
              </Link>
            </div>
            <div>
              <div className="font-semibold">가이드 이름</div>
              <span className="mr-1">{reservation.guide.fullname}</span>
              <span>
                <span>({calculateAge(reservation.guide.birthdate)}세)</span>
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
