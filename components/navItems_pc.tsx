import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AvatarDropMenu from "./avatarDropMenu";

interface NavItemsProps {
  userId?: number;
  avatar?: string;
  isApprovedGuide?: boolean;
  onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavItemsPC({
  userId,
  avatar,
  isApprovedGuide,
  onLinkClick,
}: NavItemsProps) {
  return (
    <div className="h-16 px-4 border-b border-b-border z-20 relative flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-primary">
        FGFG
      </Link>
      <NavigationMenu className="list-none">
        <NavigationMenuItem
          onClick={(e) =>
            onLinkClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>)
          }
          className="flex flex-row items-center"
        >
          <Link href="/search-guide" className={navigationMenuTriggerStyle()}>
            가이드 찾기
          </Link>
          {!isApprovedGuide ? (
            <Link href="/signup-guide" className={navigationMenuTriggerStyle()}>
              가이드 가입
            </Link>
          ) : null}
          {userId ? (
            <AvatarDropMenu avatar={avatar} isApprovedGuide={isApprovedGuide} />
          ) : (
            <>
              <Link href="/login" className={navigationMenuTriggerStyle()}>
                로그인
              </Link>
              <Link
                href="/create-account"
                className={navigationMenuTriggerStyle()}
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
