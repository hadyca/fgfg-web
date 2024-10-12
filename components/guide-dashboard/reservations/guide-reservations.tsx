"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { DateTime } from "luxon";
import {
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import GuideReservationList from "./guide-reservation-list";

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
  const [selected, setSelected] = useState<string>("upcoming");
  const [upComingList, setUpComingList] = useState<Reservations[]>([]);
  const [completedList, setCompletedList] = useState<Reservations[]>([]);
  const [canceledList, setCanceledList] = useState<Reservations[]>([]);

  useEffect(() => {
    const now = DateTime.now().toISO();

    const upcoming: Reservations[] = [];
    const completed: Reservations[] = [];
    const canceled: Reservations[] = [];

    reservations.forEach((reservation) => {
      if (
        (reservation.guideConfirm === false && now > reservation.startTime) ||
        reservation.userCancel ||
        reservation.guideCancel
      ) {
        canceled.push(reservation);
      } else if (reservation.startTime > now) {
        upcoming.push(reservation);
      } else {
        completed.push(reservation);
      }
    });

    setCanceledList(canceled);
    setUpComingList(upcoming);
    setCompletedList(completed);
  }, [reservations]);

  return (
    <>
      <div className="flex justify-around gap-3">
        <Button
          variant={selected === "upcoming" ? "secondary" : "ghost"}
          onClick={() => setSelected("upcoming")}
          className="w-full"
        >
          다가오는 예약
        </Button>
        <Button
          variant={selected === "completed" ? "secondary" : "ghost"}
          onClick={() => setSelected("completed")}
          className="w-full"
        >
          완료된 예약
        </Button>
        <Button
          variant={selected === "cancelled" ? "secondary" : "ghost"}
          onClick={() => setSelected("cancelled")}
          className="w-full"
        >
          취소된 예약
        </Button>
      </div>
      <div className="mt-3">
        {selected === "upcoming" ? (
          upComingList.length > 0 ? (
            <GuideReservationList
              reservationList={upComingList}
              selected={selected}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground min-h-[50vh]">
              <CalendarIcon className="h-10 w-10 mb-2 text-muted-foreground" />
              <span className="text-lg">다가오는 예약이 없습니다.</span>
            </div>
          )
        ) : selected === "completed" ? (
          completedList.length > 0 ? (
            <GuideReservationList
              reservationList={completedList}
              selected={selected}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground min-h-[50vh]">
              <CheckCircleIcon className="h-10 w-10 mb-2 text-muted-foreground" />
              <span className="text-lg">완료된 예약이 없습니다.</span>
            </div>
          )
        ) : canceledList.length > 0 ? (
          <GuideReservationList
            reservationList={canceledList}
            selected={selected}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground min-h-[50vh]">
            <XCircleIcon className="h-10 w-10 mb-2 text-muted-foreground" />
            <span className="text-lg">취소된 예약이 없습니다.</span>
          </div>
        )}
      </div>
    </>
  );
}
