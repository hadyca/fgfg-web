import GuideReservationsCard from "@/components/guide-reservations-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import getGuide from "@/lib/getGuide";
import {
  BanknotesIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "대시보드",
  description:
    "FGFG 가이드 계정 정보와 설정을 관리하세요. 가이드 정보 수정, 예약 내역 확인 등 다양한 계정 관리 옵션을 제공합니다.",
};

export default async function GuideDashboard() {
  const t = await getTranslations();
  const guide = await getGuide();

  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <div className="text-3xl mb-2">{t("guideDashboard.guideManagement")}</div>
      <div className="text-lg flex flex-row justify-between items-center">
        <span className="font-semibold">{guide?.seeMyGuide?.fullname}</span>
        {!guide?.seeMyGuide?.mainGuidePhoto ? (
          <Link href={"/guide-dashboard/create-guide-profile"}>
            <Button>{t("guideDashboard.createGuideProfile")}</Button>
          </Link>
        ) : null}
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <Link href={"/guide-dashboard/reservations"}>
          <Card className="shadow-md p-3">
            <GuideReservationsCard />
          </Card>
        </Link>
        <Link href={"/guide-dashboard/revenue"}>
          <Card className="shadow-md p-3">
            <div className="h-32 flex flex-col justify-between">
              <ChartBarIcon className="size-10" strokeWidth={1.2} />
              <div>
                <div>{t("guideDashboard.revenue")}</div>
                <div className="text-muted-foreground text-sm">
                  {t("guideDashboard.revenueDescription")}
                </div>
              </div>
            </div>
          </Card>
        </Link>
        <Link href={"/guide-dashboard/profile"}>
          <Card className="shadow-md p-3">
            <div className="h-32 flex flex-col justify-between">
              <IdentificationIcon className="size-10" strokeWidth={1.2} />
              <div>
                <div>{t("guideDashboard.profile")}</div>
                <div className="text-muted-foreground text-sm">
                  {t("guideDashboard.profileDescription")}
                </div>
              </div>
            </div>
          </Card>
        </Link>
        <Link href={"/guide-dashboard/bank-account"}>
          <Card className="shadow-md p-3">
            <div className="h-32 flex flex-col justify-between">
              <BanknotesIcon className="size-10" strokeWidth={1.2} />
              <div>
                <div>{t("guideDashboard.bankAccount")}</div>
                <div className="text-muted-foreground text-sm">
                  {t("guideDashboard.bankAccountDescription")}
                </div>
              </div>
            </div>
          </Card>
        </Link>
        <Link href={"/guide-dashboard/guide-manual"}>
          <Card className="shadow-md p-3">
            <div className="h-32 flex flex-col justify-between">
              <ClipboardDocumentCheckIcon
                className="size-10"
                strokeWidth={1.2}
              />
              <div>
                <div>{t("guideDashboard.guideManual")}</div>
                <div className="text-muted-foreground text-sm">
                  {t("guideDashboard.guideManualDescription")}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
