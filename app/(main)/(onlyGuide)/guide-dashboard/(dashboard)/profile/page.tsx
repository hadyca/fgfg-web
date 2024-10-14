import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ProfileInfo from "@/components/guide-dashboard/profile/profile-info";
import getGuide from "@/lib/getGuide";

export default async function Profile() {
  const guide = await getGuide();
  return (
    <>
      <div className="flex flex-row items-center mb-2">
        <Link href={"/guide-dashboard"}>
          <span className="text-primary text-lg">가이드 관리</span>
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-lg">프로필</span>
      </div>
      <div className="font-bold text-3xl mb-10">프로필</div>
      <ProfileInfo
        fullname={guide?.seeMyGuide.fullname}
        birthdate={guide?.seeMyGuide.birthdate}
        height={guide?.seeMyGuide.height}
        address={guide?.seeMyGuide.address}
        phone={guide?.seeMyGuide.phone}
        language={guide?.seeMyGuide.language}
        guidePhotos={guide?.seeMyGuide.guidePhotos}
        personality={guide?.seeMyGuide.personality}
        guideIntro={guide?.seeMyGuide.guideIntro}
        pickupPlaceMain={guide?.seeMyGuide.pickupPlaceMain}
        pickupPlaceLat={guide?.seeMyGuide.pickupPlaceLat}
        pickupPlaceLng={guide?.seeMyGuide.pickupPlaceLng}
        pickupPlaceDetail={guide?.seeMyGuide.pickupPlaceDetail}
      />
    </>
  );
}
