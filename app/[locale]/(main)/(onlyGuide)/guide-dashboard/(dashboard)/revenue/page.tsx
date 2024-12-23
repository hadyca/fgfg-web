import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/routing";
import getGuide from "@/lib/getGuide";
import RevenueInfo from "@/components/guide-dashboard/revenue/revenue-info";
import { getUntransferredRevenue } from "./action";

export const metadata = {
  title: "수익",
  description:
    "가이드 활동을 통해 얻은 수익을 확인하고 관리하세요. 정산 내역, 지급 상태, 누적 수익 등을 한눈에 파악할 수 있습니다.",
};

export default async function Revenue() {
  const guide = await getGuide();
  const unTransferredRevenue = await getUntransferredRevenue();

  return (
    <>
      <div className="flex flex-row items-center mb-2">
        <Link href={"/guide-dashboard"}>
          <span className="text-primary text-lg">가이드 관리</span>
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-lg">수익</span>
      </div>
      <div className="font-bold text-3xl mb-10">수익</div>
      <RevenueInfo
        totalAmount={guide?.seeMyGuide.totalAmount}
        totalUnTransferredAmount={guide?.seeMyGuide.totalUnTransferredAmount}
        totalReservations={guide?.seeMyGuide.totalReservations}
        totalGuideTime={guide?.seeMyGuide.totalGuideTime}
        oneMonthRevenue={guide?.seeMyGuide.oneMonthRevenue}
        unTransferredRevenue={unTransferredRevenue}
        totalThisMonthRevenue={guide?.seeMyGuide.totalThisMonthRevenue}
      />
    </>
  );
}
