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
import { useTranslations } from "next-intl";

export default function AvatarDropMenu() {
  const t = useTranslations();
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
              <div>{t("Header.message")}</div>
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
                <div>{t("Header.myReservation")}</div>
              </DropdownMenuItem>
            </Link>
          </>
        ) : null}
        <Link href="/user-dashboard/account">
          <DropdownMenuItem>
            <div>{t("Header.account")}</div>
          </DropdownMenuItem>
        </Link>
        <Link href="/user-dashboard">
          <DropdownMenuItem>
            <div>{t("Header.dashboard")}</div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {user?.guide?.isApproved ? (
          <>
            <Link href="/guide-dashboard/reservations">
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <div>{t("Header.guideReservation")}</div>
                  {countPendingReservations > 0 ? (
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  ) : null}
                </div>
              </DropdownMenuItem>
            </Link>
            <Link href="/guide-dashboard">
              <DropdownMenuItem>
                <div>{t("Header.guideManagement")}</div>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem onClick={handleLogout}>
          {t("Header.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
