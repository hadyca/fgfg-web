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
        me={user?.me}
        chatRooms={chatRooms?.seeChatRooms}
        userId={user?.me?.id}
        isApprovedGuide={user?.me?.guide?.isApproved}
      />
      {children}
    </>
  );
}
