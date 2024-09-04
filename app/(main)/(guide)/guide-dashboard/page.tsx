import { Button } from "@/components/ui/button";
import getUser from "@/lib/getUser";
import Link from "next/link";

export default async function GuideDashboard() {
  const user = await getUser();

  const isGuideProfile = user?.me?.guide?.guideProfile?.id;

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="w-full max-w-7xl">
        <span className="text-4xl font-bold">
          {user?.me?.guide?.fullname}님, 안녕하세요!
        </span>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">예약</span>
          {!isGuideProfile ? (
            <Link href={"/create-guide-profile"}>
              <Button variant={"outline"}>가이드 프로필 생성</Button>
            </Link>
          ) : (
            <Link href={"/edit-guide-profile"}>
              <Button variant={"outline"}>가이드 프로필 수정</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
