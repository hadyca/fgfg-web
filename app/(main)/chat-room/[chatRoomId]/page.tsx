import { getChatRoom, getChatRooms, getMessages } from "./actions";
import getUser from "@/lib/getUser";
import ChatMessageList from "@/components/chatMessageList";
import ChatRoomList from "@/components/chat-room-list";
import ChatRoomBill from "@/components/chat-room-bill";

interface ChatRoomProps {
  params: {
    chatRoomId: string;
  };
}

export default async function ChatRoom({
  params: { chatRoomId },
}: ChatRoomProps) {
  await getChatRoom(chatRoomId);
  const initialMessages = await getMessages(chatRoomId);
  const user = await getUser();
  const chatRooms = await getChatRooms();
  return (
    <div className="flex flex-row h-[calc(100vh-4rem)]">
      <ChatRoomList
        chatRoomId={chatRoomId}
        chatRoomList={chatRooms.seeChatRooms}
      />
      <ChatMessageList
        chatRoomId={chatRoomId}
        userId={user?.me?.id}
        username={user?.me?.username}
        avatar={user?.me?.avatar}
        initialMessages={initialMessages}
      />
      <ChatRoomBill />
    </div>
  );
}
