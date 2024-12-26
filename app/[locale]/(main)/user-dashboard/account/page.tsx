import getUser from "@/lib/getUser";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/routing";
import AccountInfo from "@/components/user-dashboard/account/account-info";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "계정",
  description: "FGFG 계정 정보를 관리하세요.",
};

export default async function Account() {
  const t = await getTranslations();
  const user = await getUser();
  return (
    <>
      <div className="flex flex-row items-center mb-2">
        <Link href={"/user-dashboard"}>
          <span className="text-primary text-lg">{t("account.dashboard")}</span>
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-lg">{t("account.account")}</span>
      </div>
      <div className="font-bold text-3xl mb-10">{t("account.account")}</div>
      <AccountInfo
        avatar={user?.me.avatar}
        username={user?.me.username}
        email={user?.me.email}
      />
    </>
  );
}
