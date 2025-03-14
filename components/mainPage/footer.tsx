import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-secondary py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          {/* 왼쪽 빈 공간 (모바일에서는 숨김) */}
          <div className="hidden md:block"></div>

          {/* 가운데 저작권 및 정책 링크 */}
          <div className="text-center mb-4 md:mb-0">
            <p className="text-lg">&copy; 2025 FGFG. All rights reserved.</p>
            <p className="text-sm mt-2">
              <Link href={"/policies/terms-and-conditions"}>
                {t("footer.termsAndConditions")}
              </Link>{" "}
              |
              <Link href={"/policies/privacy-policy"}>
                {" "}
                {t("footer.privacyPolicy")}
              </Link>{" "}
              |
              <Link href={"/policies/refund-policy"}>
                {" "}
                {t("footer.refundPolicy")}
              </Link>
            </p>
          </div>

          {/* 오른쪽 소셜 미디어 아이콘 */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="https://instagram.com/fgfgglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61573235352809"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
