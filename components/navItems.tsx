import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavItemsProps {
  username: string;
  isGuide: boolean;
  isMobile: boolean;
}

export default function NavItems({
  username,
  isGuide,
  isMobile,
}: NavItemsProps) {
  return (
    <NavigationMenu className={isMobile ? "list-none mt-4" : "list-none"}>
      <NavigationMenuItem className={isMobile ? "flex flex-col gap-1" : ""}>
        <Link href="/search-guide" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            가이드 찾기
          </NavigationMenuLink>
        </Link>

        {!isGuide ? (
          <Link href="/signup-guide" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              가이드 등록
            </NavigationMenuLink>
          </Link>
        ) : null}
        {username ? (
          <Link href="/profile" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {username}
            </NavigationMenuLink>
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
