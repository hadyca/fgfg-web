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

  const chatRoomId =
    chatRooms?.length > 0
      ? chatRooms?.reduce((latest: any, chatRoom: any) =>
          new Date(chatRoom.createdAt) > new Date(latest.createdAt)
            ? chatRoom
            : latest
        ).id
      : "";
  const isExistUnRead = chatRooms?.some(
    (chatRoom: any) => chatRoom.isRead === false
  );

  return (
    <>
      <HeaderSection
        me={user?.me}
        chatRoomId={chatRoomId}
        reservations={reservations}
        isExistUnRead={isExistUnRead}
        userId={user?.me?.id}
        isApprovedGuide={user?.me?.guide?.isApproved}
      />
      {children}
    </>
  );
}
