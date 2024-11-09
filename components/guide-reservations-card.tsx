"use client";

import { useGuideReservationStore } from "@/store/useGuideReservationStore";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function GuideReservationsCard() {
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
        <div>가이드 예약</div>
        <div className="text-muted-foreground text-sm">
          예약들을 관리 할 수 있어요
        </div>
      </div>
    </div>
  );
}
