"use client";

import {
  convertMonthDayIntl,
  convertToVietnamISO,
  convertToVietnamTime,
} from "@/lib/utils";

interface ReservationProps {
  params: {
    id: string;
  };
  searchParams: {
    starttime: string;
    endtime: string;
  };
}

export default function Reservation(props: ReservationProps) {
  const date = convertToVietnamISO(props.searchParams.starttime);

  const onlyMonthDay = convertMonthDayIntl(date!);

  const startTime = convertToVietnamTime(props.searchParams.starttime);
  const endTime = convertToVietnamTime(props.searchParams.endtime);

  return (
    <div className="max-w-6xl mx-auto my-10 px-6 md:px-0 border">
      <div>
        <div className="text-xl">예약정보</div>
        <div>
          <div>날짜</div>
          <div>
            <span>{onlyMonthDay}</span>
          </div>
        </div>
        <div>
          <div>시간</div>
          <div>
            <span>{startTime}~</span>
            <span>{endTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
