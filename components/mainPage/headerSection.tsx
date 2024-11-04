"use client";

import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useRef, useState } from "react";
import NavItemsPC from "../navItems_pc";
import NavItemsMobile from "../navItems_mobile";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import AvatarDropMenu from "../avatarDropMenu";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { Separator } from "../ui/separator";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { useUserStore } from "@/store/useUserStore";

interface Guide {
  id: number;
  fullname: string;
  isApproved: string;
}

interface Users {
  id: number;
}

interface userChatRooms {
  id: string;
  otherUserId: number;
  users: Users[];
}

interface User {
  id: number;
  username: string;
  avatar: string;
  email: string;
  guide: Guide;
  chatRooms: userChatRooms[];
}
interface ChatRooms {
  id: string;
  avatar: string;
  usernameOrFullname: string;
  lastMessage: string;
  createdAt: string;
  isRead: boolean;
}

interface NavProps {
  userId?: number;
  me: User;
  chatRooms: ChatRooms[];
  chatRoomId?: string;
  avatar?: string;
  isApprovedGuide?: boolean;
}

export default function HeaderSection({
  me,
  chatRooms,
  userId,
  chatRoomId,
  avatar,
  isApprovedGuide,
}: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newChatRoomId, setNewChatRoomId] = useState("");
  const myChannel = useRef<RealtimeChannel>();
  const { user, setUser } = useUserStore();
  const { setChatRooms } = useChatRoomStore();

  useEffect(() => {
    setUser(me);
    // myChannel.current = supabase.channel(`user-${user?.id}`);
    // myChannel.current
    //   .on("broadcast", { event: "message" }, (payload) => {
    //     setNewChatRoomId(payload.payload.chatRoomId);
    //   })
    //   .subscribe();

    // return () => {
    //   myChannel.current?.unsubscribe();
    // };
  }, [me, user?.id, setUser]);

  useEffect(() => {
    setChatRooms(chatRooms);
  }, [chatRooms, setChatRooms]);

  // useEffect(() => {
  //   myChannel.current = supabase.channel(`user-${userId}`);
  //   myChannel.current
  //     .on("broadcast", { event: "message" }, (payload) => {
  //       setNewChatRoomId(payload.payload.chatRoomId);
  //     })
  //     .subscribe();

  //   return () => {
  //     myChannel.current?.unsubscribe();
  //   };
  // }, [userId]);

  const handleLinkClick = () => {
    setIsOpen(false); // 링크 클릭 시 Sheet 닫기
  };

  return (
    <header>
      {/* 데스크탑 네비게이션 메뉴 */}
      <nav className="md:block hidden">
        <NavItemsPC
          userId={userId}
          chatRoomId={
            newChatRoomId ? newChatRoomId : chatRoomId ? chatRoomId : ""
          }
          avatar={avatar}
          isApprovedGuide={isApprovedGuide}
        />
        <Separator />
      </nav>
      {/* 모바일 네비게이션 메뉴 */}
      <nav className="md:hidden block">
        <div className="h-16 px-4 border-b border-b-border z-20 relative flex items-center">
          <div className="flex-1">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden block">
                <Bars3Icon className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side={"left"} className="w-1/2">
                <NavItemsMobile
                  userId={userId}
                  isApprovedGuide={isApprovedGuide}
                  onLinkClick={handleLinkClick}
                />
              </SheetContent>
            </Sheet>
          </div>
          <Link
            href="/"
            className="text-2xl font-bold text-primary absolute left-1/2  transform -translate-x-1/2"
          >
            FGFG
          </Link>
          <div className="flex-1 flex justify-end">
            {userId ? (
              <AvatarDropMenu
                chatRoomId={
                  newChatRoomId ? newChatRoomId : chatRoomId ? chatRoomId : ""
                }
                avatar={avatar}
                isApprovedGuide={isApprovedGuide}
              />
            ) : (
              <Link
                href="/create-account"
                className={navigationMenuTriggerStyle()}
              >
                회원가입
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
