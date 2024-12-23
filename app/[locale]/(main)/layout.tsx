import getUser from "@/lib/getUser";
import { getChatRooms } from "./chat-room/[chatRoomId]/actions";
import HeaderSection from "@/components/mainPage/headerSection";
import { getReservations } from "./(onlyGuide)/guide-dashboard/(dashboard)/reservations/actions";
import getSession from "@/lib/session";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const chatRooms = await getChatRooms();
  const session = await getSession();

  let reservations = [];

  if (session.guideId) {
    reservations = await getReservations();
  }

  return (
    <>
      <HeaderSection
        me={user?.me}
        chatRooms={chatRooms}
        reservations={reservations}
        userId={user?.me?.id}
        isApprovedGuide={user?.me?.guide?.isApproved}
      />
      {children}
    </>
  );
}
