"use client";

import { getChatRoom, getChatRooms, getMessages } from "./actions";
import getUser from "@/lib/getUser";
import ChatMessageList from "@/components/chatMessageList";
import ChatRoomList from "@/components/chat-room-list";
import ChatRoomBill from "@/components/chat-room-bill";
import { useEffect, useState } from "react";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { GetMessageSkeleton } from "./skeleton";

interface ChatRoomProps {
  params: {
    chatRoomId: string;
  };
}

export default function ChatRoom({ params: { chatRoomId } }: ChatRoomProps) {
  const [otherUserId, setOtherUserId] = useState();
  const [messageLoading, setMessageLoading] = useState(true); // ChatMessageList 로딩 상태
  const [initialMessages, setInitialMessages] = useState([]);
  const [user, setUser] = useState<{ me: any } | undefined>(undefined); // user 상태 타입 설정

  const { initialLoading, setInitialLoading } = useChatRoomStore(); // Zustand로 로딩 상태 관리
  const setChatRooms = useChatRoomStore((state) => state.setChatRooms); // Zustand에서 전역 상태 설정 함수

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (initialLoading) {
          setInitialLoading(true);
        }
        setMessageLoading(true);
        // 다른 유저 검증용
        const chatRoom = await getChatRoom(chatRoomId);
        setOtherUserId(chatRoom.seeChatRoom.otherUserId);

        const fetchedChatRooms = await getChatRooms();
        const messages = await getMessages(chatRoomId);
        const currentUser = await getUser();

        // 상태 업데이트
        setInitialMessages(messages);
        setUser(currentUser); // currentUser의 타입에 맞게 설정
        setChatRooms(fetchedChatRooms.seeChatRooms);
        setInitialLoading(false);
        setMessageLoading(false);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchData();
  }, [chatRoomId, setChatRooms, initialLoading, setInitialLoading]);

  return (
    <div className="flex flex-row h-[calc(100vh-4rem)]">
      {initialLoading ? (
        <div className="w-1/4 p-4">
          {/* ChatRoomList에 해당하는 로딩 UI */}
          <div className="text-center text-gray-500">Loading chat rooms...</div>
        </div>
      ) : (
        <ChatRoomList
          chatRoomId={chatRoomId}
          userId={user?.me?.id}
          initialChatRooms={[]}
        />
      )}
      {initialLoading || messageLoading ? (
        <GetMessageSkeleton />
      ) : (
        <ChatMessageList
          chatRoomId={chatRoomId}
          otherUserId={otherUserId!}
          userId={user?.me?.id}
          username={user?.me?.username}
          avatar={user?.me?.avatar}
          initialMessages={initialMessages}
          initialLoading={initialLoading}
          messageLoading={messageLoading}
        />
      )}
      <ChatRoomBill />
    </div>
  );
}
