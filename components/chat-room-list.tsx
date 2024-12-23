"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { formatChatRoomDate } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useChatRoomStore } from "@/store/useChatRoomStore";
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
import { outChatRoom } from "@/app/[locale]/(main)/chat-room/[chatRoomId]/actions";
import { GetChatRoomsSkeleton } from "@/app/[locale]/(main)/chat-room/[chatRoomId]/skeleton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";

interface ChatRoomListProps {
  chatRoomId: string;
  userId: number | undefined;
  setShowChatMessageList?: (value: boolean) => void;
}

export default function ChatRoomList({
  chatRoomId,
  setShowChatMessageList,
}: ChatRoomListProps) {
  const locale = useLocale();
  const t = useTranslations();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [deleteChatRoomId, setDeleteChatRoomId] = useState("");
  const router = useRouter();

  const { removeChatRoom, initialChatRoomsLoading, chatRooms } =
    useChatRoomStore();
  const handleRoomClick = (chatRoomId: string) => {
    router.push(`/chat-room/${chatRoomId}`);
    if (setShowChatMessageList) {
      setShowChatMessageList(true);
    }
  };

  const handleOutChatRoom = (e: React.MouseEvent, chatRoomId: string) => {
    e.stopPropagation(); // 이벤트 버블링 중단
    setDeleteChatRoomId(chatRoomId);
    setIsAlertDialogOpen(true); // AlertDialog 열림 상태로 설정
  };

  const handleCloseDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const handleDelete = async (deleteChatRoomId: string) => {
    await outChatRoom(deleteChatRoomId);
    const updatedChatRooms = chatRooms.filter(
      (chatRoom) => chatRoom.id !== deleteChatRoomId
    );
    removeChatRoom(deleteChatRoomId);

    if (updatedChatRooms.length > 0) {
      router.push(`/chat-room/${updatedChatRooms[0].id}`);
    } else {
      window.location.href = "/chat-room"; // 새로고침을 포함한 리다이렉트
    }
    setIsAlertDialogOpen(false);
  };
  return (
    <div className="md:w-[576px] px-10 pt-5 overflow-y-auto flex flex-col h-full">
      {initialChatRoomsLoading ? (
        <GetChatRoomsSkeleton />
      ) : (
        <>
          {chatRooms.map((chatRoom) => {
            return (
              <div
                key={chatRoom.id}
                className={`flex items-start w-full p-4 mb-2 ${
                  chatRoom.id === chatRoomId ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-100 rounded-md cursor-pointer`}
                onClick={() => handleRoomClick(chatRoom.id)} // 클릭 시 URL 이동 처리
              >
                <div className="relative">
                  <Avatar className="size-12">
                    {chatRoom.avatar ? (
                      <>
                        <AvatarImage
                          src={`${chatRoom.avatar}/avatar`}
                          alt="@shadcn"
                        />
                        <AvatarFallback>
                          <UserCircleIcon className="text-primary w-full h-full" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <UserCircleIcon className="text-primary w-full h-full" />
                    )}
                  </Avatar>
                  {!chatRoom.isRead && (
                    <span className="absolute top-0 -left-1 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </div>
                <div className="flex flex-col w-full ml-4 gap-3 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold truncate whitespace-nowrap overflow-hidden flex-grow min-w-0 max-w-full">
                      {chatRoom.usernameOrFullname}
                    </span>
                    {/* !!shadcn - DropDownMunu 쓰면 안됨!! 추 후 드랍다운 메뉴 쓸거면 수동으로 만들어!*/}
                    <TrashIcon
                      className="ml-2 size-5 text-primary flex-shrink-0"
                      onClick={(e) => handleOutChatRoom(e, chatRoom.id)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 truncate whitespace-nowrap overflow-hidden flex-grow min-w-0 max-w-full">
                      {chatRoom.lastMessage}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {formatChatRoomDate(chatRoom.createdAt, locale)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
      {/* AlertDialog 컴포넌트 */}
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("chatRoom.leaveChat")}</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>
              {t("chatRoom.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(deleteChatRoomId)}>
              {t("chatRoom.leave")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
