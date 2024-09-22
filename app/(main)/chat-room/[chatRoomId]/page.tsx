import { notFound } from "next/navigation";
import { getChatRoom, getMessages } from "./actions";
import ChatMessageList from "@/components/chatMessageList";
import getUser from "@/lib/getUser";

interface ChatRoomProps {
  params: {
    chatRoomId: string;
  };
}

export default async function ChatRoom({
  params: { chatRoomId },
}: ChatRoomProps) {
  const chatRoom = await getChatRoom(chatRoomId);
  if (!chatRoom) {
    return notFound();
  }
  const initialMessages = await getMessages(chatRoomId);
  const user = await getUser();
  return (
    <ChatMessageList
      chatRoomId={chatRoomId}
      userId={user?.me?.id}
      username={user?.me?.username}
      avatar={user?.me?.avatar}
      initialMessages={initialMessages}
    />
  );
}
