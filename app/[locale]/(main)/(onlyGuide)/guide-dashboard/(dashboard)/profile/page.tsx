import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/routing";
import ProfileInfo from "@/components/guide-dashboard/profile/profile-info";
import getGuide from "@/lib/getGuide";

export const metadata = {
  title: "프로필",
  description:
    "가이드 프로필 정보를 수정하고 관리하세요. 개인 소개, 언어 능력, 사진 등을 업데이트하여 더 나은 서비스를 제공할 수 있습니다.",
};

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
        isActive={guide?.seeMyGuide.isActive}
      />
    </>
  );
}
