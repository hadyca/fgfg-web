import HeaderSection from "@/components/mainPage/headerSection";
import getUser from "@/lib/getUser";
import { getChatRooms } from "./chat-room/[chatRoomId]/actions";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const chatRooms = await getChatRooms();
  return (
    <>
      <HeaderSection
        userId={user?.me?.id}
        chatRoomId={
          chatRooms?.seeChatRooms?.length > 0
            ? chatRooms.seeChatRooms[0].id
            : null
        }
        avatar={user?.me?.avatar}
        isApprovedGuide={user?.me?.guide?.isApproved}
      />
      {children}
    </>
  );
}
