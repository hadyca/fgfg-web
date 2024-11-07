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

interface AvatarDropMenuProps {
  chatRoomId: string;
  isExistUnRead: boolean;
}

export default function AvatarDropMenu({
  chatRoomId,
  isExistUnRead,
}: AvatarDropMenuProps) {
  const { user, clearUser } = useUserStore();

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
          {isExistUnRead && (
            <span>
              <span className="absolute top-0 -left-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>
              <span className="absolute top-0 -left-1 w-2 h-2 inline-flex rounded-full bg-primary"></span>
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/chat-room/${chatRoomId}`}>
          <DropdownMenuItem>
            <div className="flex items-center gap-1">
              <div>메시지</div>
              {isExistUnRead ? (
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
                <div>가이드 예약</div>
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
