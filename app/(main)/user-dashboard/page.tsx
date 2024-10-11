import { Card } from "@/components/ui/card";
import getUser from "@/lib/getUser";
import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  IdentificationIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function UserDashboard() {
  const user = await getUser();
  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <div className="text-3xl mb-2">대쉬보드</div>
      <div className="text-lg">
        <span className="font-semibold">{user?.me?.username}</span>
        <span>, {user?.me?.email}</span>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <Link href={"/user-dashboard/reservations"}>
          <Card className="shadow-md max-w-sm p-3">
            <div className="h-32 flex flex-col justify-between">
              <CalendarDaysIcon className="size-10" strokeWidth={1.2} />
              <div>
                <div>예약</div>
                <div className="text-muted-foreground">
                  내가 신청했던 예약들을 볼 수 있어요
                </div>
              </div>
            </div>
          </Card>
        </Link>
        <Link href={"/user-dashboard/account"}>
          <Card className="shadow-md max-w-sm p-3">
            <div className="h-32 flex flex-col justify-between">
              <IdentificationIcon className="size-10" strokeWidth={1.2} />
              <div>
                <div>계정</div>
                <div className="text-muted-foreground">
                  계정 정보를 수정 할 수 있어요
                </div>
              </div>
            </div>
          </Card>
        </Link>
        <Card className="shadow-md max-w-sm p-3">
          <div className="h-32 flex flex-col justify-between">
            <QuestionMarkCircleIcon className="size-10" strokeWidth={1.2} />
            <div>
              <div>F&Q</div>
              <div className="text-muted-foreground">자주 묻는 질문</div>
            </div>
          </div>
        </Card>
        <Card className="shadow-md max-w-sm p-3">
          <div className="h-32 flex flex-col justify-between">
            <ChatBubbleLeftRightIcon className="size-10" strokeWidth={1.2} />
            <div>
              <div>문의</div>
              <div className="text-muted-foreground">
                서비스 문의, 광고, 프로그램 오류 등
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
