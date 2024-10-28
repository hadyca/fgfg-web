"use client";

import { useEffect } from "react";
import { Button } from "../../ui/button";
import { DateTime } from "luxon";
import {
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import GuideReservationList from "./guide-reservation-list";
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
}

interface GuideReservationsProps {
  reservations: Reservations[];
}

export default function GuideReservations({
  reservations,
}: GuideReservationsProps) {
  const { selectedTab, setSelectedTab, reservationList, setReservationList } =
    useGuideReservationStore();

  useEffect(() => {
    const now = DateTime.now().toISO();
    const formattedReservations = reservations.map((reservation: any) => {
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
    (reservation: any) => reservation.status === selectedTab
  );

  return (
    <>
      <div className="flex justify-around gap-3">
        <Button
          variant={selectedTab === "upcoming" ? "secondary" : "ghost"}
          onClick={() => setSelectedTab("upcoming")}
          className="w-full"
        >
          다가오는 예약
        </Button>
        <Button
          variant={selectedTab === "completed" ? "secondary" : "ghost"}
          onClick={() => setSelectedTab("completed")}
          className="w-full"
        >
          완료된 예약
        </Button>
        <Button
          variant={selectedTab === "cancelled" ? "secondary" : "ghost"}
          onClick={() => setSelectedTab("cancelled")}
          className="w-full"
        >
          취소된 예약
        </Button>
      </div>
      <div className="mt-3">
        {filteredReservations.length > 0 ? (
          <GuideReservationList
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
                ? "다가오는 예약이 없습니다."
                : selectedTab === "completed"
                ? "완료된 예약이 없습니다."
                : "취소된 예약이 없습니다."}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
