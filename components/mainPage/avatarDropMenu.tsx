"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { logout } from "@/lib/sharedActions";
import { useUserStore } from "@/store/useUserStore";
import { useGuideReservationStore } from "@/store/useGuideReservationStore";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { useEffect, useState } from "react";

export default function AvatarDropMenu() {
  const [isExistUnread, setIsExistUnread] = useState(false);
  const [lastChatRoomId, setLastChatRoomId] = useState("");
  const { chatRooms } = useChatRoomStore();
  const { user, clearUser } = useUserStore();
  const { countPendingReservations } = useGuideReservationStore();

  useEffect(() => {
    const isExistUnread = chatRooms?.some(
      (chatRoom: any) => chatRoom.isRead === false
    );
    setIsExistUnread(isExistUnread);

    const lastChatRoomId =
      chatRooms?.length > 0
        ? chatRooms?.reduce((latest: any, chatRoom: any) =>
            new Date(chatRoom.createdAt) > new Date(latest.createdAt)
              ? chatRoom
              : latest
          ).id
        : "";
    setLastChatRoomId(lastChatRoomId);
  }, [chatRooms]);

  const handleLogout = async () => {
    clearUser();
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="relative">
          <Avatar>
            {user?.avatar ? (
              <>
                <AvatarImage src={`${user.avatar}/avatar`} alt="@shadcn" />
                <AvatarFallback>
                  <UserCircleIcon className="text-primary w-full h-full" />
                </AvatarFallback>
              </>
            ) : (
              <UserCircleIcon className="text-primary w-full h-full" />
            )}
          </Avatar>
          {(isExistUnread || countPendingReservations > 0) && (
            <span>
              <span className="absolute top-0 -left-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>
              <span className="absolute top-0 -left-1 w-2 h-2 inline-flex rounded-full bg-primary"></span>
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/chat-room/${lastChatRoomId}`}>
          <DropdownMenuItem>
            <div className="flex items-center gap-1">
              <div>메시지</div>
              {isExistUnread ? (
                <span className="w-2 h-2 rounded-full bg-primary"></span>
              ) : null}
            </div>
          </DropdownMenuItem>
        </Link>
        {!user?.guide?.isApproved ? (
          <>
            <Link href="/user-dashboard/reservations">
              <DropdownMenuItem>
                <div>내 예약</div>
              </DropdownMenuItem>
            </Link>
          </>
        ) : null}
        <Link href="/user-dashboard/account">
          <DropdownMenuItem>
            <div>계정</div>
          </DropdownMenuItem>
        </Link>
        <Link href="/user-dashboard">
          <DropdownMenuItem>
            <div>대시보드</div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {user?.guide?.isApproved ? (
          <>
            <Link href="/guide-dashboard/reservations">
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <div>가이드 예약</div>
                  {countPendingReservations > 0 ? (
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  ) : null}
                </div>
              </DropdownMenuItem>
            </Link>
            <Link href="/guide-dashboard">
              <DropdownMenuItem>
                <div>가이드 관리</div>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
