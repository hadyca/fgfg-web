"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "./ui/button";
import Link from "next/link";

interface ChatRoomList {
  id: string;
  avatar: string;
  usernameOrFullname: string;
  lastMessage: string;
  createdAt: string;
  isRead: true;
}

interface ChatRoomListProps {
  chatRoomId: string;
  chatRoomList: ChatRoomList[];
}

export default function ChatRoomList({
  chatRoomId,
  chatRoomList,
}: ChatRoomListProps) {
  return (
    <div className="p-4 border-r">
      {chatRoomList.map((chatRoom) => (
        <Link
          href={`/chat-room/${chatRoom.id}`}
          key={chatRoom.id}
          className={`flex items-start w-full p-4 mb-4 ${
            chatRoom.id === chatRoomId ? "bg-gray-100" : "bg-white"
          }  hover:bg-gray-100 rounded-md`}
        >
          {/* Avatar */}
          <div>
            <Avatar className="w-12 h-12">
              <AvatarImage src={`${chatRoom.avatar}/avatar`} alt="fgfgavatar" />
              <AvatarFallback>
                <UserCircleIcon className="text-primary w-12 h-12" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Main Content */}
          <div className="flex flex-col flex-grow ml-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">
                {chatRoom.usernameOrFullname}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(parseInt(chatRoom.createdAt)).toLocaleTimeString(
                  "ko-KR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </span>
            </div>

            {/* Last Message */}
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-700">
                {chatRoom.lastMessage}
              </span>
            </div>
            {/* Sub Information */}
            {!chatRoom.isRead ? (
              <div className="text-sm text-gray-500 mt-1 flex items-center">
                <span className="mr-1 text-red-500">●</span>
                읽지 않음
              </div>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
