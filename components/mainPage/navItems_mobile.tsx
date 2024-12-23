import { Link } from "@/i18n/routing";
import {
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import LocaleSwitcher from "../local-switcher";
import { useTranslations } from "next-intl";

interface NavItemsProps {
  userId: number;
  isApprovedGuide: Boolean;
  onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavItemsMobile({
  userId,
  isApprovedGuide,
  onLinkClick,
}: NavItemsProps) {
  const t = useTranslations("header");

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
            {t("login")}
          </Link>
        ) : null}
        <Link href="/search-guide" className={navigationMenuTriggerStyle()}>
          {t("seeGuide")}
        </Link>
        {!isApprovedGuide ? (
          <Link href="/signup-guide" className={navigationMenuTriggerStyle()}>
            {t("signupGuide")}
          </Link>
        ) : null}
        <div className="px-4">
          <LocaleSwitcher />
        </div>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
