"use client";

import { useEffect } from "react";
import { Button } from "../../ui/button";
import { DateTime } from "luxon";
import UserReservationList from "./user-reservation-list";
import {
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useUserReservationStore } from "@/store/useUserReservationStore";
import { useTranslations } from "next-intl";

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

interface UserReservationsProps {
  reservations: Reservations[];
}

export default function UserReservations({
  reservations,
}: UserReservationsProps) {
  const t = useTranslations();
  const { selectedTab, setSelectedTab, reservationList, setReservationList } =
    useUserReservationStore();

  useEffect(() => {
    const now = DateTime.now().toISO();

    const formattedReservations = reservations.map((reservation) => {
      if (
        (reservation.guideConfirm === false && now > reservation.startTime) ||
        reservation.userCancel ||
        reservation.guideCancel
      ) {
        return { ...reservation, status: "cancelled" };
      } else if (reservation.startTime > now) {
        return { ...reservation, status: "upcoming" };
      } else {
        return { ...reservation, status: "completed" };
      }
    });

    setReservationList(formattedReservations);
  }, [reservations, setReservationList]);

  const filteredReservations = reservationList.filter(
    (reservation) => reservation.status === selectedTab
  );

  return (
    <>
      <div className="flex justify-around gap-3">
        <Button
          variant={selectedTab === "upcoming" ? "secondary" : "ghost"}
          onClick={() => setSelectedTab("upcoming")}
          className="w-full"
        >
          {t("reservations.upcoming")}
        </Button>
        <Button
          variant={selectedTab === "completed" ? "secondary" : "ghost"}
          onClick={() => setSelectedTab("completed")}
          className="w-full"
        >
          {t("reservations.completed")}
        </Button>
        <Button
          variant={selectedTab === "cancelled" ? "secondary" : "ghost"}
          onClick={() => setSelectedTab("cancelled")}
          className="w-full"
        >
          {t("reservations.cancelled")}
        </Button>
      </div>
      <div className="mt-3">
        {filteredReservations.length > 0 ? (
          <UserReservationList
            reservationList={filteredReservations}
            selected={selectedTab}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground min-h-[50vh]">
            {selectedTab === "upcoming" && (
              <CalendarIcon className="h-10 w-10 mb-2 text-muted-foreground" />
            )}
            {selectedTab === "completed" && (
              <CheckCircleIcon className="h-10 w-10 mb-2 text-muted-foreground" />
            )}
            {selectedTab === "cancelled" && (
              <XCircleIcon className="h-10 w-10 mb-2 text-muted-foreground" />
            )}
            <span className="text-lg">
              {selectedTab === "upcoming"
                ? t("reservations.noUpcomingReservations")
                : selectedTab === "completed"
                ? t("reservations.noCompletedReservations")
                : t("reservations.noCancelledReservations")}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
