"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { formatChatRoomDate } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js router 사용
import { useChatRoomStore } from "@/store/useChatRoomStore";

interface ChatRooms {
  id: string;
  avatar: string;
  usernameOrFullname: string;
  lastMessage: string;
  createdAt: string;
  isRead: true;
}

interface ChatRoomListProps {
  chatRoomId: string;
  initialChatRooms: ChatRooms[];
}

export default function ChatRoomList({
  chatRoomId,
  initialChatRooms,
}: ChatRoomListProps) {
  const router = useRouter();
  const chatRooms = useChatRoomStore((state) => state.chatRooms); // Zustand에서 전역 상태 가져오기
  const setChatRooms = useChatRoomStore((state) => state.setChatRooms);

  // 페이지 로드 시 채팅방 리스트 상태 설정
  useEffect(() => {
    if (chatRooms.length === 0) {
      setChatRooms(initialChatRooms); // Zustand에 채팅방 리스트 저장
    }
  }, [initialChatRooms, chatRooms, setChatRooms]);

  const handleRoomClick = (chatRoomId: string) => {
    router.push(`/chat-room/${chatRoomId}`);
  };

  return (
    <div className="p-4 border-r">
      {chatRooms.map((chatRoom: any) => (
        <div
          key={chatRoom.id}
          className={`flex items-start w-full p-4 mb-2 ${
            chatRoom.id === chatRoomId ? "bg-gray-100" : "bg-white"
          } hover:bg-gray-100 rounded-md cursor-pointer`}
          onClick={() => handleRoomClick(chatRoom.id)} // 클릭 시 URL 이동 처리
        >
          <div>
            <Avatar className="w-12 h-12">
              <AvatarImage src={`${chatRoom.avatar}/avatar`} alt="fgfgavatar" />
              <AvatarFallback>
                <UserCircleIcon className="text-primary w-12 h-12" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">
                {chatRoom.usernameOrFullname}
              </span>
              <span className="text-xs text-gray-400">
                {formatChatRoomDate(chatRoom.createdAt)}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-700">
                {chatRoom.lastMessage}
              </span>
            </div>
            {!chatRoom.isRead ? (
              <div className="text-sm text-gray-500 mt-1 flex items-center">
                <span className="mr-1 text-red-500">●</span>
                읽지 않음
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
