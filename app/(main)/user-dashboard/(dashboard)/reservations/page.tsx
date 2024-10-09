import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { getReservations } from "./actions";
import UserReservations from "@/components/user-dashboard/reservations/user-Reservations";
import Link from "next/link";

export default async function Reservations() {
  const reservations = await getReservations();
  return (
    <>
      <div className="flex flex-row items-center mb-3">
        <Link href={"/user-dashboard"}>
          <span className="text-primary text-lg">대쉬보드</span>
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-lg">예약</span>
      </div>
      <UserReservations reservations={reservations} />
    </>
  );
}
