import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer id="contact" className="bg-secondary py-8">
      <div className="container mx-auto text-center">
        <p className="text-lg">&copy; 2024 FGFG. All rights reserved.</p>

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
    </footer>
  );
}
