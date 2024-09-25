"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { formatChatRoomDate } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Next.js router 사용
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

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
  userId: number;
  initialChatRooms: ChatRooms[];
}

export default function ChatRoomList({
  chatRoomId,
  userId,
  initialChatRooms,
}: ChatRoomListProps) {
  const router = useRouter();
  const myChannel = useRef<RealtimeChannel>();
  const updateLastMessageInRoom = useChatRoomStore(
    (state) => state.updateLastMessageInRoom
  );
  const chatRooms = useChatRoomStore((state) => state.chatRooms);
  const setChatRooms = useChatRoomStore((state) => state.setChatRooms);
  const updateIsReadInRoom = useChatRoomStore(
    (state) => state.updateIsReadInRoom
  );

  useEffect(() => {
    if (chatRooms.length === 0) {
      setChatRooms(initialChatRooms);
    }

    myChannel.current = supabase.channel(`user-${userId}`);
    myChannel.current
      .on("broadcast", { event: "message" }, (payload) => {
        updateLastMessageInRoom(
          payload.payload.chatRoomId,
          payload.payload.message,
          payload.payload.createdAt
        );

        //같은 채팅방에 있으면 isRead는 ture처리
        const isSameRoom = Boolean(chatRoomId === payload.payload.chatRoomId);
        updateIsReadInRoom(payload.payload.chatRoomId, isSameRoom);
      })
      .subscribe();

    return () => {
      myChannel.current?.unsubscribe();
    };
  }, [
    initialChatRooms,
    userId,
    chatRooms,
    chatRoomId,
    setChatRooms,
    updateLastMessageInRoom,
    updateIsReadInRoom,
  ]);

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
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={`${chatRoom.avatar}/avatar`} alt="fgfgavatar" />
              <AvatarFallback>
                <UserCircleIcon className="text-primary w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            {!chatRoom.isRead && (
              <span className="absolute top-0 -left-1 w-2 h-2 bg-primary rounded-full"></span>
            )}
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
          </div>
        </div>
      ))}
    </div>
  );
}
