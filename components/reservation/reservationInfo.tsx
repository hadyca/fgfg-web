"use client";

import { GetReservationSkeletonTop } from "@/app/[locale]/(main)/reservation/[guideId]/skeleton";
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
  const [loading, setLoading] = useState(true);
  const [onlyMonthDay, setOnlyMonthDay] = useState<string | null>(null);
  const [covertedStartTime, setCovertedStartTime] = useState("");
  const [covertedEndTime, setCovertedEndTime] = useState("");

  useEffect(() => {
    setLoading(true);
    const userLocale = navigator.language.split("-")[0] || "ko"; // "ko" or "en" 같은 값만 남김
    const date = convertToVietnamISO(startTime);
    if (date) {
      const formattedDate = convertMonthDayIntl(date, userLocale);
      setOnlyMonthDay(formattedDate);
    }
    setCovertedStartTime(convertToVietnamTime(startTime));
    setCovertedEndTime(convertToVietnamTime(endTime));

    setLoading(false);
  }, [startTime, endTime]);

  return (
    <>
      {loading ? (
        <GetReservationSkeletonTop />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="text-xl font-semibold">예약 정보</div>
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
      )}
    </>
  );
}
