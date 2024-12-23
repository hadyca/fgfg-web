export const dynamic = "force-dynamic";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/routing";
import GuideReservations from "@/components/guide-dashboard/reservations/guide-reservations";

export const metadata = {
  title: "가이드 예약",
  description:
    "예약 요청을 확인하고 관리하세요. 예약 일정, 고객 정보, 요청 사항 등을 검토하여 원활한 서비스 제공을 준비할 수 있습니다.",
};

export default async function Reservations() {
  return (
    <>
      <div className="flex flex-row items-center mb-2">
        <Link href={"/guide-dashboard"}>
          <span className="text-primary text-lg">가이드 관리</span>
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-lg">가이드 예약</span>
      </div>
      <div className="font-bold text-3xl mb-10">가이드 예약</div>
      <GuideReservations />
    </>
  );
}
