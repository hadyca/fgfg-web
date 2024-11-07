import getUser from "@/lib/getUser";
import { getChatRooms } from "./chat-room/[chatRoomId]/actions";
import HeaderSection from "@/components/mainPage/headerSection";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const chatRooms = await getChatRooms();

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
        isExistUnRead={isExistUnRead}
        userId={user?.me?.id}
        isApprovedGuide={user?.me?.guide?.isApproved}
      />
      {children}
    </>
  );
}
