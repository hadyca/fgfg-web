"use client";

import { getChatRoom, getChatRooms, getMessages } from "./actions";
import getUser from "@/lib/getUser";
import ChatMessageList from "@/components/chatMessageList";
import ChatRoomList from "@/components/chat-room-list";
import ChatRoomBill from "@/components/chat-room-bill";
import { useEffect, useState } from "react";
import { useChatRoomStore } from "@/store/useChatRoomStore";

interface ChatRoomProps {
  params: {
    chatRoomId: string;
  };
}

export default function ChatRoom({ params: { chatRoomId } }: ChatRoomProps) {
  const [otherUserId, setOtherUserId] = useState();
  const [user, setUser] = useState<{ me: any } | undefined>(undefined);
  const setInitialChatRoomsLoading = useChatRoomStore(
    (state) => state.setInitialChatRoomsLoading
  );
  const setInitialMessagesLoading = useChatRoomStore(
    (state) => state.setInitialMessagesLoading
  );
  const setMessages = useChatRoomStore((state) => state.setMessages);
  const setChatRooms = useChatRoomStore((state) => state.setChatRooms);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 다른 유저 검증용
        const chatRoom = await getChatRoom(chatRoomId);

        setOtherUserId(chatRoom.seeChatRoom.otherUserId);

        const fetchedChatRooms = await getChatRooms();
        const messages = await getMessages(chatRoomId);
        const currentUser = await getUser();
        // 상태 업데이트
        setUser(currentUser); // currentUser의 타입에 맞게 설정
        setMessages(chatRoomId, messages);
        setChatRooms(fetchedChatRooms.seeChatRooms);
        setInitialChatRoomsLoading(false); //초기 로딩 1회에 대해서, 모든 데이터를 다 가지고 오고 false로 바꿈
        setInitialMessagesLoading(chatRoomId, false);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchData();
    //아래는 경고 eslint경고 문구 제거 주석 (zustand 의존성 배열에 추가 안해도됨)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId]);

  return (
    <div className="flex flex-row h-[calc(100vh-4rem)] w-full">
      <ChatRoomList chatRoomId={chatRoomId} userId={user?.me?.id} />
      <ChatMessageList
        chatRoomId={chatRoomId}
        otherUserId={otherUserId!}
        userId={user?.me?.id}
        username={user?.me?.username}
        avatar={user?.me?.avatar}
      />
      <ChatRoomBill />
    </div>
  );
}
