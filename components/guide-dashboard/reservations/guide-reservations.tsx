"use client";

import { Button } from "../../ui/button";
import {
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import GuideReservationList from "./guide-reservation-list";
import { useGuideReservationStore } from "@/store/useGuideReservationStore";
import { useTranslations } from "next-intl";

export default function GuideReservations() {
  const t = useTranslations();
  const { selectedTab, setSelectedTab, reservations } =
    useGuideReservationStore();

  const filteredReservations = reservations.filter(
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
          {t("guideReservations.upcoming")}
        </Button>
        <Button
          variant={selectedTab === "completed" ? "secondary" : "ghost"}
          onClick={() => setSelectedTab("completed")}
          className="w-full"
        >
          {t("guideReservations.completed")}
        </Button>
        <Button
          variant={selectedTab === "cancelled" ? "secondary" : "ghost"}
          onClick={() => setSelectedTab("cancelled")}
          className="w-full"
        >
          {t("guideReservations.cancelled")}
        </Button>
      </div>
      <div className="mt-3">
        {filteredReservations.length > 0 ? (
          <GuideReservationList
            reservations={filteredReservations}
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
                ? t("guideReservations.noUpcomingReservations")
                : selectedTab === "completed"
                ? t("guideReservations.noCompletedReservations")
                : t("guideReservations.noCancelledReservations")}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
