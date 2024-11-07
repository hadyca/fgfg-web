"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AvatarDropMenu from "./avatarDropMenu";

interface NavItemsProps {
  userId: number;
  chatRoomId: string;
  isExistUnRead: boolean;
  isApprovedGuide: boolean;
  onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavItemsPC({
  userId,
  chatRoomId,
  isExistUnRead,
  isApprovedGuide,
  onLinkClick,
}: NavItemsProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur(); // Link 클릭 후 hover 상태 제거
    onLinkClick?.(e);
  };

  return (
    <div className="max-w-6xl mx-auto h-16 px-4 relative z-20 flex justify-between items-center">
      <a href="/" className="text-2xl font-bold text-primary">
        FGFG
      </a>
      <NavigationMenu className="list-none">
        <NavigationMenuItem className="flex flex-row items-center">
          <Link
            href="/search-guide"
            className={navigationMenuTriggerStyle()}
            onClick={handleLinkClick}
          >
            가이드 보기
          </Link>
          {!isApprovedGuide ? (
            <Link
              href="/signup-guide"
              className={navigationMenuTriggerStyle()}
              onClick={handleLinkClick}
            >
              가이드 가입
            </Link>
          ) : null}
          {userId ? (
            <AvatarDropMenu
              chatRoomId={chatRoomId}
              isExistUnRead={isExistUnRead}
            />
          ) : (
            <>
              <Link
                href="/login"
                className={navigationMenuTriggerStyle()}
                onClick={handleLinkClick}
              >
                로그인
              </Link>
              <Link
                href="/create-account"
                className={navigationMenuTriggerStyle()}
                onClick={handleLinkClick}
              >
                회원가입
              </Link>
            </>
          )}
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}
