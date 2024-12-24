"use client";

import { GetReservationSkeletonTop } from "@/app/[locale]/(main)/reservation/[guideId]/skeleton";
import {
  convertMonthDayIntl,
  convertToVietnamISO,
  convertToVietnamTime,
} from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ReservationInfoPros {
  startTime: string;
  endTime: string;
}

export default function ReservationInfo({
  startTime,
  endTime,
}: ReservationInfoPros) {
  const locale = useLocale();
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [onlyMonthDay, setOnlyMonthDay] = useState<string | null>(null);
  const [covertedStartTime, setCovertedStartTime] = useState("");
  const [covertedEndTime, setCovertedEndTime] = useState("");

  useEffect(() => {
    setLoading(true);
    const date = convertToVietnamISO(startTime);
    if (date) {
      const formattedDate = convertMonthDayIntl(date, locale);
      setOnlyMonthDay(formattedDate);
    }
    setCovertedStartTime(convertToVietnamTime(startTime));
    setCovertedEndTime(convertToVietnamTime(endTime));

    setLoading(false);
  }, [startTime, endTime, locale]);

  return (
    <>
      {loading ? (
        <GetReservationSkeletonTop />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="text-xl font-semibold">
            {t("reservation.reservationInfo")}
          </div>
          <div>
            <div>{t("reservation.date")}</div>
            <div>
              <span>{onlyMonthDay}</span>
            </div>
          </div>
          <div>
            <div>{t("reservation.time")}</div>
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
