"use client";

import { getBills, getChatRoom, getChatRooms, getMessages } from "./actions";
import getUser from "@/lib/getUser";
import ChatMessageList from "@/components/chatMessageList";
import ChatRoomList from "@/components/chat-room-list";
import { useEffect, useState } from "react";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion"; // framer-motion 임포트

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
  const [bills, setBills] = useState([]);
  const [showChatMessageList, setShowChatMessageList] = useState(true); // 메시지 리스트 보여줄지 여부 상태

  const isMediumScreen = useMediaQuery("(min-width: 768px)"); // md 크기 기준으로 실시간 감지

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
      {isMediumScreen ? (
        <div className="flex flex-row w-full h-[calc(100vh-4rem)]">
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
                  <ArrowLeftIcon className="w-6 h-6 text-secondary-foreground" />
                </button>

                <ChatMessageList
                  chatRoomId={chatRoomId}
                  otherUserId={otherUserId!}
                  userId={user?.me?.id}
                  username={user?.me?.username}
                  avatar={user?.me?.avatar}
                  bills={bills}
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
