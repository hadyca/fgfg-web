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
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { useEffect, useState } from "react";
import { useUnreadStore } from "@/store/useUnReadStore";
import { useRouter } from "next/navigation";

interface AvatarDropMenuProps {
  chatRoomId?: string;
}

export default function AvatarDropMenu({ chatRoomId }: AvatarDropMenuProps) {
  const router = useRouter();

  const { chatRooms } = useChatRoomStore();
  const { user, clearUser } = useUserStore();
  const { isUnread: realTimeUnread, setIsUnread: setRealTimeUnread } =
    useUnreadStore();
  const [isUnread, setIsUnread] = useState(false);
  const handleLogout = async () => {
    clearUser();
    await logout();
  };

  useEffect(() => {
    const isExistUnRead = chatRooms.some(
      (chatRoom: any) => chatRoom.isRead === false
    );
    setIsUnread(isExistUnRead);
  }, [chatRooms]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setRealTimeUnread(false);
    const targetUrl = `/chat-room/${
      chatRoomId ? chatRoomId : chatRooms?.length > 0 ? chatRooms[0].id : ""
    }`;

    router.push(targetUrl);
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
          {(isUnread || realTimeUnread) && (
            <span>
              <span className="absolute top-0 -left-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>
              <span className="absolute top-0 -left-1 w-2 h-2 inline-flex rounded-full bg-primary"></span>
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div onClick={handleClick}>
          <DropdownMenuItem>
            <span>메시지</span>
          </DropdownMenuItem>
        </div>
        {!user?.guide?.isApproved ? (
          <>
            <Link href="/user-dashboard/reservations">
              <DropdownMenuItem>
                <span>내 예약</span>
              </DropdownMenuItem>
            </Link>
          </>
        ) : null}
        <Link href="/user-dashboard/account">
          <DropdownMenuItem>
            <span>계정</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/user-dashboard">
          <DropdownMenuItem>
            <span>대시보드</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {user?.guide?.isApproved ? (
          <>
            <Link href="/guide-dashboard">
              <DropdownMenuItem>
                <span>가이드 관리</span>
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
