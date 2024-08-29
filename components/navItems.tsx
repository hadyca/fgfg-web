import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";

interface NavItemsProps {
  userId?: number;
  avatar?: string;
  isApprovedGuide?: Boolean;
  isMobile: boolean;
  onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavItems({
  userId,
  avatar,
  isApprovedGuide,
  isMobile,
  onLinkClick,
}: NavItemsProps) {
  return (
    <NavigationMenu className={isMobile ? "list-none mt-4" : "list-none"}>
      <NavigationMenuItem
        onClick={(e) =>
          onLinkClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>)
        }
        className={
          isMobile ? "flex flex-col gap-1" : "flex flex-row items-center"
        }
      >
        <Link href="/search-guide" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            가이드 찾기
          </NavigationMenuLink>
        </Link>
        {!isApprovedGuide ? (
          <Link href="/signup-guide" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              가이드 가입
            </NavigationMenuLink>
          </Link>
        ) : null}
        {userId ? (
          <Link href="/user-profile" legacyBehavior passHref>
            <Avatar>
              <AvatarImage src={avatar} alt="@shadcn" />
              <AvatarFallback>
                <UserCircleIcon className="text-primary" />
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <>
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                로그인
              </NavigationMenuLink>
            </Link>
            <Link href="/create-account" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                회원가입
              </NavigationMenuLink>
            </Link>
          </>
        )}
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
