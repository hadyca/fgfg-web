"use client";

import {
  convertMonthDayIntl,
  convertToVietnamISO,
  convertToVietnamTime,
} from "@/lib/utils";
import { useEffect, useState } from "react";

interface ReservationInfoPros {
  startTime: string;
  endTime: string;
}

export default function ReservationInfo({
  startTime,
  endTime,
}: ReservationInfoPros) {
  const [onlyMonthDay, setOnlyMonthDay] = useState<string | null>(null);

  useEffect(() => {
    const userLocale = navigator.language.split("-")[0] || "ko"; // "ko" or "en" 같은 값만 남김
    const date = convertToVietnamISO(startTime);
    if (date) {
      const formattedDate = convertMonthDayIntl(date, userLocale);
      setOnlyMonthDay(formattedDate);
    }
  }, [startTime]);

  const covertedStartTime = convertToVietnamTime(startTime);
  const covertedEndTime = convertToVietnamTime(endTime);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl font-semibold">예약정보</div>
      <div>
        <div>날짜</div>
        <div>
          <span>{onlyMonthDay}</span>
        </div>
      </div>
      <div>
        <div>시간</div>
        <div>
          <span>{covertedStartTime}~</span>
          <span>{covertedEndTime}</span>
        </div>
      </div>
    </div>
  );
}
