"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DateTime } from "luxon";
import UserReservationList from "./user-Reservation-list";

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

interface UserDashboardReservationsProps {
  reservations: Reservations[];
}

export default function UserReservations({
  reservations,
}: UserDashboardReservationsProps) {
  const [selected, setSelected] = useState<string>("upcoming");
  const [upComingList, setUpComingList] = useState<Reservations[]>([]);
  const [completedList, setCompletedList] = useState<Reservations[]>([]);
  const [canceledList, setCanceledList] = useState<Reservations[]>([]);
  useEffect(() => {
    const now = DateTime.now(); // 현재 시간을 Luxon DateTime 형식으로 얻음
    const upcoming: Reservations[] = [];
    const completed: Reservations[] = [];
    const canceled: Reservations[] = [];

    reservations.forEach((reservation) => {
      const startTime = DateTime.fromISO(reservation.startTime);

      if (reservation.userCancel || reservation.guideCancel) {
        canceled.push(reservation);
      } else if (startTime > now) {
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
          <UserReservationList reservationList={upComingList} />
        ) : selected === "completed" ? (
          <UserReservationList reservationList={completedList} />
        ) : (
          <UserReservationList reservationList={canceledList} />
        )}
      </div>
    </>
  );
}
