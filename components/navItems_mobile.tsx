import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavItemsProps {
  userId?: number;
  isApprovedGuide?: Boolean;
  onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavItemsMobile({
  userId,
  isApprovedGuide,
  onLinkClick,
}: NavItemsProps) {
  return (
    <NavigationMenu className="list-none mt-4">
      <NavigationMenuItem
        onClick={(e) =>
          onLinkClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>)
        }
        className="flex flex-col gap-1"
      >
        {!userId ? (
          <Link href="/login" className={navigationMenuTriggerStyle()}>
            로그인
          </Link>
        ) : null}
        <Link href="/search-guide" className={navigationMenuTriggerStyle()}>
          가이드 보기
        </Link>
        {!isApprovedGuide ? (
          <Link href="/signup-guide" className={navigationMenuTriggerStyle()}>
            가이드 가입
          </Link>
        ) : null}
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
