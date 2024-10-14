import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import getGuide from "@/lib/getGuide";
import {
  CalendarDaysIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function GuideDashboard() {
  const guide = await getGuide();

  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <div className="text-3xl mb-2">가이드 관리</div>
      <div className="text-lg flex flex-row justify-between items-center">
        <span className="font-semibold">{guide?.seeMyGuide?.fullname}</span>
        {!guide?.seeMyGuide?.mainGuidePhoto ? (
          <Link href={"/guide-dashboard/create-guide-profile"}>
            <Button>가이드 프로필 생성</Button>
          </Link>
        ) : null}
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <Link href={"/guide-dashboard/reservations"}>
          <Card className="shadow-md p-3">
            <div className="h-32 flex flex-col justify-between">
              <CalendarDaysIcon className="size-10" strokeWidth={1.2} />
              <div>
                <div>가이드 예약</div>
                <div className="text-muted-foreground">
                  신청온 예약들을 관리 할 수 있어요
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
                <div>프로필</div>
                <div className="text-muted-foreground">
                  프로필 정보를 수정할 수 있어요
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
