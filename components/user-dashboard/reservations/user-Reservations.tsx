"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { DateTime } from "luxon";
import UserReservationList from "./user-reservation-list";
import {
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

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
}

interface UserReservationsProps {
  reservations: Reservations[];
}

export default function UserReservations({
  reservations,
}: UserReservationsProps) {
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
            <UserReservationList
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
            <UserReservationList
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
          <UserReservationList
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
