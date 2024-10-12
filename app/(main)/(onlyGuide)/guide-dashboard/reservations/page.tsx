import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { getReservations } from "./actions";
import Link from "next/link";
import GuideReservations from "@/components/guide-dashboard/reservations/guide-reservations";

export default async function Reservations() {
  const reservations = await getReservations();

  return (
    <>
      <div className="flex flex-row items-center mb-2">
        <Link href={"/user-dashboard"}>
          <span className="text-primary text-lg">가이드 관리</span>
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-lg">가이드 예약</span>
      </div>
      <div className="font-bold text-3xl mb-10">가이드 예약</div>
      <GuideReservations reservations={reservations} />
    </>
  );
}
