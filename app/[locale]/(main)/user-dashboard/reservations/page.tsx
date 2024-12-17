export const dynamic = "force-dynamic";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { getReservations } from "./actions";
import Link from "next/link";
import UserReservations from "@/components/user-dashboard/reservations/user-reservations";

export const metadata = {
  title: "예약 내역",
  description: "예약 내역을 확인하시고, 예약을 관리해보세요.",
};

export default async function Reservations() {
  const reservations = await getReservations();
  return (
    <>
      <div className="flex flex-row items-center mb-2">
        <Link href={"/user-dashboard"}>
          <span className="text-primary text-lg">대시보드</span>
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-lg">예약</span>
      </div>
      <div className="font-bold text-3xl mb-10">예약</div>
      <UserReservations reservations={reservations} />
    </>
  );
}
