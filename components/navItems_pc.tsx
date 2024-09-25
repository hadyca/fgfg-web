import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AvatarDropMenu from "./avatarDropMenu";

interface NavItemsProps {
  userId?: number;
  chatRoomId?: string;
  avatar?: string;
  isApprovedGuide?: boolean;
  onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavItemsPC({
  userId,
  chatRoomId,
  avatar,
  isApprovedGuide,
  onLinkClick,
}: NavItemsProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur(); // Link 클릭 후 hover 상태 제거
    onLinkClick?.(e);
  };

  return (
    <div className="h-16 px-4 border-b border-b-border relative z-20 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-primary">
        FGFG
      </Link>
      <NavigationMenu className="list-none">
        <NavigationMenuItem className="flex flex-row items-center">
          <Link
            href="/search-guide"
            className={navigationMenuTriggerStyle()}
            onClick={handleLinkClick}
          >
            가이드 찾기
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
              avatar={avatar}
              chatRoomId={chatRoomId}
              isApprovedGuide={isApprovedGuide}
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
