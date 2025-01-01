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
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/reservations/actions";
import { useGuideReservationStore } from "@/store/useGuideReservationStore";
import { useTranslations } from "next-intl";
import { LoadingOverlay } from "@/components/loading-overlay";

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
  reservations: Reservations[];
  selected: string;
}

export default function GuideReservationList({
  reservations,
  selected,
}: UpcomingReservationsProps) {
  const t = useTranslations();
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
      {(confirmLoading || rejectLoading) && <LoadingOverlay />}
      {reservations.map((reservation) => (
        <Card key={reservation.id} className="shadow-md max-w-full p-6 h-fit">
          <div className="flex flex-row items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              {t("guideReservations.reservationNumber")}:{reservation.id}
            </span>
            {selected === "upcoming" ? (
              reservation.guideConfirm ? (
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-md">
                  <CheckCircleIcon className="h-5 w-5 text-green-700" />
                  <span className="font-semibold">
                    {t("guideReservations.reservationConfirmed")}
                  </span>
                </div>
              ) : (
                <div className="flex flex-row gap-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={rejectLoading || confirmLoading}
                        variant={"outline"}
                      >
                        {t("guideReservations.reject")}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t("guideReservations.rejectDescription")}
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          {t("guideReservations.no")}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleReject(reservation.id)}
                        >
                          {t("guideReservations.yes")}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button disabled={rejectLoading || confirmLoading}>
                        {t("guideReservations.accept")}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t("guideReservations.acceptDescription")}
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          {t("guideReservations.no")}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleConfirm(reservation.id)}
                        >
                          {t("guideReservations.yes")}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )
            ) : selected === "completed" ? (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-md">
                <CheckCircleIcon className="h-5 w-5 text-green-700" />
                <span className="font-semibold">
                  {t("guideReservations.reservationConfirmed")}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-md">
                <XCircleIcon className="h-5 w-5 text-red-700" />
                <span className="font-semibold">
                  {t("guideReservations.reservationCanceled")}
                </span>
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
              <div className="font-semibold">
                {t("guideReservations.username")}
              </div>
              <span className="mr-1">{reservation.user.username}</span>
              <span>
                <span>{`(${reservation.customerAgeRange}${t(
                  "guideReservations.age"
                )})`}</span>
              </span>
            </div>
            <div>
              <div className="font-semibold">
                {t("guideReservations.reservationDate")}
              </div>
              <span>{convertDate(reservation.startTime)}</span>
            </div>
            <div>
              <div className="font-semibold">
                {t("guideReservations.reservationTime")}
              </div>
              <span>
                {`${convertToVietnamTime(
                  reservation.startTime
                )} ~ ${convertToVietnamTime(reservation.endTime)}`}
              </span>
            </div>
            <div>
              <div className="font-semibold">
                {t("guideReservations.pickupLocation")}
              </div>
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
              <div className="font-semibold">
                {t("guideReservations.feeDetail")}
              </div>
              <div>
                <span className="underline">
                  {`${formatCurrency(SERVICE_FEE)} x ${calculateGapTimeISO(
                    reservation.startTime,
                    reservation.endTime
                  )}${t("guideReservations.hour")}`}
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
