import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import getGuide from "@/lib/getGuide";
import RevenueInfo from "@/components/guide-dashboard/revenue/revenue-info";
import { getUntransferredRevenue } from "./action";

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
