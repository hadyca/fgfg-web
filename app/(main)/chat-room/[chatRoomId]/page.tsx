"use client";

import { getBills, getChatRoom, getChatRooms, getMessages } from "./actions";
import getUser from "@/lib/getUser";
import ChatMessageList from "@/components/chatMessageList";
import ChatRoomList from "@/components/chat-room-list";
import { useEffect, useState } from "react";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatRoomListMobile from "@/components/chat-room-list-mobile";
import ChatMessageListMobile from "@/components/chatMessageListMobile";

interface ChatRoomProps {
  params: {
    chatRoomId: string;
  };
}

export default function ChatRoom({ params: { chatRoomId } }: ChatRoomProps) {
  const [otherUserId, setOtherUserId] = useState();
  const [user, setUser] = useState<{ me: any } | undefined>(undefined);
  const [bills, setBills] = useState([]);
  const [tabValue, setTabValue] = useState("messages");

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
        const bills = await getBills(chatRoomId);

        setUser(currentUser);
        setMessages(chatRoomId, messages);
        setChatRooms(fetchedChatRooms.seeChatRooms);
        setBills(bills);
        setInitialChatRoomsLoading(false);
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
    <>
      <div className="hidden md:flex flex-row h-[calc(100vh-4rem)] w-full">
        <ChatRoomList chatRoomId={chatRoomId} userId={user?.me?.id} />
        <ChatMessageList
          chatRoomId={chatRoomId}
          otherUserId={otherUserId!}
          userId={user?.me?.id}
          username={user?.me?.username}
          avatar={user?.me?.avatar}
          bills={bills}
        />
      </div>
      <div className="flex md:hidden h-[calc(100vh-4rem)] w-full">
        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="w-full m-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chatRooms">리스트</TabsTrigger>
            <TabsTrigger value="messages">메시지</TabsTrigger>
          </TabsList>
          <TabsContent value="chatRooms">
            <ChatRoomListMobile
              chatRoomId={chatRoomId}
              userId={user?.me?.id}
              setTabValue={setTabValue}
            />
          </TabsContent>
          <TabsContent value="messages">
            <ChatMessageListMobile
              chatRoomId={chatRoomId}
              otherUserId={otherUserId!}
              userId={user?.me?.id}
              username={user?.me?.username}
              avatar={user?.me?.avatar}
              bills={bills}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
