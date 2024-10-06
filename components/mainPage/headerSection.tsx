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

interface NavProps {
  userId?: number;
  chatRoomId?: string;
  avatar?: string;
  isApprovedGuide?: boolean;
}

export default function HeaderSection({
  userId,
  chatRoomId,
  avatar,
  isApprovedGuide,
}: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newChatRoomId, setNewChatRoomId] = useState("");
  const myChannel = useRef<RealtimeChannel>();

  useEffect(() => {
    myChannel.current = supabase.channel(`user-${userId}`);
    myChannel.current
      .on("broadcast", { event: "message" }, (payload) => {
        console.log(payload);
        setNewChatRoomId(payload.payload.chatRoomId);
      })
      .subscribe();

    return () => {
      myChannel.current?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, newChatRoomId]);

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
