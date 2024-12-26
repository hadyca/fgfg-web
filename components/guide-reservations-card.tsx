"use client";

import { useGuideReservationStore } from "@/store/useGuideReservationStore";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export default function GuideReservationsCard() {
  const t = useTranslations();
  const { countPendingReservations } = useGuideReservationStore();
  return (
    <div className="h-32 flex flex-col justify-between">
      <div className="flex flex-row items-center">
        <CalendarDaysIcon className="size-10" strokeWidth={1.2} />
        {countPendingReservations > 0 ? (
          <span className="bg-primary text-white font-bold rounded-full ml-1 size-6 text-center">
            {countPendingReservations}
          </span>
        ) : null}
      </div>
      <div>
        <div>{t("guideDashboard.guideReservations")}</div>
        <div className="text-muted-foreground text-sm">
          {t("guideDashboard.guideReservationsDescription")}
        </div>
      </div>
    </div>
  );
}
