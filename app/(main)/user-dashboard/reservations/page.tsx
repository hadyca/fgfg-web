import { getReservations } from "./actions";
import UserReservations from "@/components/user-dashboard/user-Reservations";

export default async function Reservations() {
  const reservations = await getReservations();
  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <UserReservations reservations={reservations} />
    </div>
  );
}
