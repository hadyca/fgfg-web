"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { formatChatRoomDate } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { outChatRoom } from "@/app/(main)/chat-room/[chatRoomId]/actions";
import { GetChatRoomsSkeleton } from "@/app/(main)/chat-room/[chatRoomId]/skeleton";

interface ChatRoomListProps {
  chatRoomId: string;
  userId: number;
}

export default function ChatRoomList({
  chatRoomId,
  userId,
}: ChatRoomListProps) {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [deleteChatRoomId, setDeleteChatRoomId] = useState("");
  const router = useRouter();
  const myChannel = useRef<RealtimeChannel>();
  const initialChatRoomsLoading = useChatRoomStore(
    (state) => state.initialChatRoomsLoading
  );
  const updateLastMessageInRoom = useChatRoomStore(
    (state) => state.updateLastMessageInRoom
  );
  const chatRooms = useChatRoomStore((state) => state.chatRooms);
  const updateIsReadInRoom = useChatRoomStore(
    (state) => state.updateIsReadInRoom
  );
  const removeChatRoom = useChatRoomStore((state) => state.removeChatRoom);

  useEffect(() => {
    myChannel.current = supabase.channel(`user-${userId}`);
    myChannel.current
      .on("broadcast", { event: "message" }, (payload) => {
        updateLastMessageInRoom(
          payload.payload.chatRoomId,
          payload.payload.message,
          payload.payload.createdAt
        );

        const isSameRoom = Boolean(chatRoomId === payload.payload.chatRoomId);
        updateIsReadInRoom(payload.payload.chatRoomId, isSameRoom);
      })
      .subscribe();

    return () => {
      myChannel.current?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, chatRoomId, chatRooms]);

  const handleRoomClick = (chatRoomId: string) => {
    router.push(`/chat-room/${chatRoomId}`);
  };

  const handleOutChatRoom = (e: React.MouseEvent, chatRoomId: string) => {
    e.stopPropagation(); // 이벤트 버블링 중단
    setDeleteChatRoomId(chatRoomId);
    setIsAlertDialogOpen(true); // AlertDialog 열림 상태로 설정
  };

  const handleCloseDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const handleContinueDialog = async (deleteChatRoomId: string) => {
    await outChatRoom(deleteChatRoomId);
    if (chatRoomId === deleteChatRoomId) {
      router.push("/");
    } else {
      removeChatRoom(deleteChatRoomId);
    }
    setIsAlertDialogOpen(false);
  };

  return (
    <div className="min-w-[560px] px-10 pt-5">
      {initialChatRoomsLoading ? (
        <GetChatRoomsSkeleton />
      ) : (
        <>
          {chatRooms.map((chatRoom: any) => (
            <div
              key={chatRoom.id}
              className={`flex items-start p-4 mb-2 ${
                chatRoom.id === chatRoomId ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-100 rounded-md cursor-pointer`}
              onClick={() => handleRoomClick(chatRoom.id)} // 클릭 시 URL 이동 처리
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={chatRoom.avatar ? `${chatRoom.avatar}/avatar` : ""}
                    alt="fgfgavatar"
                  />
                  <AvatarFallback>
                    <UserCircleIcon className="text-primary w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                {!chatRoom.isRead && (
                  <span className="absolute top-0 -left-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </div>
              <div className="flex flex-col w-full ml-4 gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold truncate whitespace-nowrap overflow-hidden max-w-80">
                    {chatRoom.usernameOrFullname}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus:ring-0 focus:outline-none focus:border-none">
                        <MoreHorizontal className="h-6 w-6" strokeWidth={0.8} />
                        <span className="sr-only">Toggle menu</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => handleOutChatRoom(e, chatRoom.id)}
                      >
                        나가기
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 truncate whitespace-nowrap overflow-hidden max-w-80">
                    {chatRoom.lastMessage}
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatChatRoomDate(chatRoom.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {/* AlertDialog 컴포넌트 */}
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>채팅방을 나가시겠어요?</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleContinueDialog(deleteChatRoomId)}
            >
              나가기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
