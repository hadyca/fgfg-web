"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AvatarDropMenu from "./avatarDropMenu";
import LocalSwitcher from "../local-switcher";
import { useTranslations } from "next-intl";

interface NavItemsProps {
  userId: number;
  isApprovedGuide: boolean;
  onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavItemsPC({
  userId,
  isApprovedGuide,
  onLinkClick,
}: NavItemsProps) {
  const t = useTranslations("header");
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
          <LocalSwitcher />
          <Link
            href="/search-guide"
            className={navigationMenuTriggerStyle()}
            onClick={handleLinkClick}
          >
            {t("seeGuide")}
          </Link>
          {!isApprovedGuide ? (
            <Link
              href="/signup-guide"
              className={navigationMenuTriggerStyle()}
              onClick={handleLinkClick}
            >
              {t("signupGuide")}
            </Link>
          ) : null}
          {userId ? (
            <AvatarDropMenu />
          ) : (
            <>
              <Link
                href="/login"
                className={navigationMenuTriggerStyle()}
                onClick={handleLinkClick}
              >
                {t("login")}
              </Link>
              <Link
                href="/create-account"
                className={navigationMenuTriggerStyle()}
                onClick={handleLinkClick}
              >
                {t("signup")}
              </Link>
            </>
          )}
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}
