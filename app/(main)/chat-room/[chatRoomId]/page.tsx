"use client";

import { getBills, getChatRoom, getChatRooms, getMessages } from "./actions";
import getUser from "@/lib/getUser";
import ChatMessageList from "@/components/chatMessageList";
import ChatRoomList from "@/components/chat-room-list";
import { useEffect, useRef, useState } from "react";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import { motion, AnimatePresence } from "framer-motion";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface ChatRoomProps {
  params: {
    chatRoomId: string;
  };
}

const variants = {
  hidden: { x: "-100%", opacity: 0 }, // 숨길 때 왼쪽으로 이동
  visible: { x: 0, opacity: 1 }, // 중앙에 있을 때
  exit: { x: "100%", opacity: 0 }, // 나갈 때 오른쪽으로 이동
};

export default function ChatRoom({ params: { chatRoomId } }: ChatRoomProps) {
  const [otherUserId, setOtherUserId] = useState();
  const [user, setUser] = useState<{ me: any } | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [showChatMessageList, setShowChatMessageList] = useState(true); // 메시지 리스트 보여줄지 여부 상태

  const myChannel = useRef<RealtimeChannel>();
  const messageChannel = useRef<RealtimeChannel>();
  const otherUserChannel = useRef<RealtimeChannel>();

  const isMediumScreen = useMediaQuery("(min-width: 768px)"); // md 크기 기준으로 실시간 감지

  const {
    setInitialChatRoomsLoading,
    setInitialMessagesLoading,
    setMessages,
    setInitialMessages,
    setBills,
    updateLastMessageInRoom,
    updateIsReadInRoom,
    setChatRooms,
    messages,
    chatRooms,
  } = useChatRoomStore();

  useEffect(() => {
    myChannel.current = supabase.channel(`user-${user?.me?.id}`);
    myChannel.current
      .on("broadcast", { event: "message" }, (payload) => {
        updateLastMessageInRoom(
          payload.payload.chatRoomId,
          payload.payload.message,
          payload.payload.createdAt,
          payload.payload.avatar,
          payload.payload.usernameOrFullname
        );

        const isSameRoom = Boolean(chatRoomId === payload.payload.chatRoomId);
        updateIsReadInRoom(payload.payload.chatRoomId, isSameRoom);
      })
      .subscribe();

    return () => {
      myChannel.current?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.me?.id, chatRoomId]);

  useEffect(() => {
    //상대 채널 구독
    otherUserChannel.current = supabase.channel(`user-${otherUserId}`);
    //채팅방 채널 구독 (채팅방 실시간용)
    messageChannel.current = supabase.channel(`room-${chatRoomId}`);
    messageChannel.current
      .on("broadcast", { event: "message" }, (payload) => {
        const receivedMessage = {
          id: payload.payload.id,
          payload: payload.payload.payload,
          createdAt: payload.payload.createdAt,
          user: payload.payload.user,
          isMyMessage: false,
        };
        setMessages(chatRoomId, [receivedMessage]);
      })
      .subscribe();

    return () => {
      otherUserChannel.current?.unsubscribe();
      messageChannel.current?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId, otherUserId, isMediumScreen, showChatMessageList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInitialMessagesLoading(chatRoomId, true);

        // 다른 유저 검증용
        const chatRoom = await getChatRoom(chatRoomId);
        setOtherUserId(chatRoom.seeChatRoom.otherUserId);

        const currentRoomMessages = messages[chatRoomId] || [];

        const chatRooms = await getChatRooms();
        setChatRooms(chatRooms?.seeChatRooms);

        if (currentRoomMessages.length === 0) {
          const fetchedMessages = await getMessages(chatRoomId);
          setInitialMessages(chatRoomId, fetchedMessages);
        }

        const currentUser = await getUser();
        if (chatRoom.seeChatRoom.normalUserId === currentUser?.me.id) {
          setUsername(currentUser?.me.username);
        } else {
          setUsername(currentUser?.me?.guide.fullname);
        }

        //예약 영수증 보기
        const bills = await getBills(chatRoomId);

        setUser(currentUser);
        setBills(chatRoomId, bills);

        setInitialChatRoomsLoading(false);
        setInitialMessagesLoading(chatRoomId, false);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };
    fetchData();
    // 아래는 경고 eslint경고 문구 제거 주석 (zustand 의존성 배열에 추가 안해도됨)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId]);

  return (
    <>
      {isMediumScreen ? (
        <div className="flex flex-row w-full h-[calc(100vh-4rem)]">
          <ChatRoomList chatRoomId={chatRoomId} userId={user?.me?.id} />
          <ChatMessageList
            chatRoomId={chatRoomId}
            userId={user?.me?.id}
            username={username}
            avatar={user?.me?.avatar}
            messageChannel={messageChannel.current}
            otherUserChannel={otherUserChannel.current}
          />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-4rem)] w-full relative overflow-hidden">
          <AnimatePresence mode="wait">
            {showChatMessageList ? (
              <motion.div
                key="chatMessageList"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 0.2 }} // 최신 트랜지션 적용
                className="absolute w-full h-full"
              >
                <button
                  onClick={() => setShowChatMessageList(false)}
                  className="absolute top-3 left-5 p-2 bg-secondary rounded-full z-20"
                >
                  <ChevronLeftIcon
                    className="size-5 text-secondary-foreground"
                    strokeWidth={1.2}
                  />
                </button>
                <ChatMessageList
                  chatRoomId={chatRoomId}
                  userId={user?.me?.id}
                  username={username}
                  avatar={user?.me?.avatar}
                  messageChannel={messageChannel.current}
                  otherUserChannel={otherUserChannel.current}
                />
              </motion.div>
            ) : (
              <motion.div
                key="chatRoomList"
                variants={variants}
                initial="exit"
                animate="visible"
                exit="hidden"
                transition={{ type: "tween", duration: 0.2 }}
                className="absolute w-full h-full"
              >
                <ChatRoomList
                  chatRoomId={chatRoomId}
                  userId={user?.me?.id}
                  setShowChatMessageList={setShowChatMessageList}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
