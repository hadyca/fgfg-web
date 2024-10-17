"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import FullnameForm from "./fullname-form";
import HeightForm from "./height-form";
import BirthdateForm from "./birthdate-form";
import LanguageForm from "./language-form";
import AddressForm from "./address-form";
import PhoneForm from "./phone-form";
import GuidePhotosForm from "./guidePhotos-form";
import PersonalityForm from "./personality-form";
import GuideIntroForm from "./guideIntro-form";
import PickupPlaceForm from "./pickupPlace-form";
import IsActiveForm from "./isActive-form";

interface LanguageInput {
  id: number;
  language: string;
  level: string;
}

interface GuidePhotosInput {
  fileUrlOrder: number;
  fileUrl: string;
}

interface ProfileInfoProps {
  fullname: string;
  birthdate: string;
  height: string;
  address: string;
  phone: string;
  language: LanguageInput[];
  guidePhotos: GuidePhotosInput[];
  personality:
    | "귀엽고 발랄한"
    | "섹시하고 매혹적인"
    | "엉뚱하고 독특한"
    | "활발하고 명랑한"
    | "차분하고 따뜻한"
    | "친절하고 상냥한"
    | "긍정적이고 밝은"
    | "유머러스하고 재치있는"
    | "지적이고 신중한"
    | "매력적이고 세련된";
  guideIntro: string;
  pickupPlaceMain: string;
  pickupPlaceLat: number;
  pickupPlaceLng: number;
  pickupPlaceDetail: string;
  isActive: boolean;
}

export default function ProfileInfo({
  fullname,
  birthdate,
  height,
  address,
  phone,
  language,
  guidePhotos,
  personality,
  guideIntro,
  pickupPlaceMain,
  pickupPlaceLat,
  pickupPlaceLng,
  pickupPlaceDetail,
  isActive,
}: ProfileInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] pb-10">
      <div className="flex flex-col gap-5">
        <FullnameForm fullname={fullname} />
        <Separator />
        <BirthdateForm birthdate={birthdate} />
        <Separator />
        <HeightForm height={height} />
        <Separator />
        <LanguageForm language={language} />
        <Separator />
        <AddressForm address={address} />
        <Separator />
        <PhoneForm phone={phone} />
        <Separator />
        <GuidePhotosForm guidePhotos={guidePhotos} />
        <Separator />
        <PersonalityForm personality={personality} />
        <Separator />
        <GuideIntroForm guideIntro={guideIntro} />
        <Separator />
        <PickupPlaceForm
          pickupPlaceMain={pickupPlaceMain}
          pickupPlaceLat={pickupPlaceLat}
          pickupPlaceLng={pickupPlaceLng}
          pickupPlaceDetail={pickupPlaceDetail}
        />
        <Separator />
        <IsActiveForm isActive={isActive} />
      </div>
      <Separator className="md:hidden my-10" />
      <div className="px-14">
        <Card className="p-6">
          <EyeIcon className="size-16" strokeWidth={1.2} />
          <div className="text-lg font-semibold mb-2">
            다른 사람에게 어떤 정보가 공개되나요?
          </div>
          <div className="text-muted-foreground">
            생년월일(나인만 공개), 거주지 주소, 핸드폰 번호는 비공개 정보이며
            나머지 정보는 모두 공개 됩니다.
          </div>
          <Separator className="my-6" />
          <LockClosedIcon className="size-16" strokeWidth={1.2} />
          <div className="text-lg font-semibold mb-2">
            가이드 활동 일시 정지를 하면 어떻게 되나요?
          </div>
          <div className="text-muted-foreground">
            가이드님의 프로필은 공개되어 있지만, 고객님들께서는 예약을 진행할 수
            없습니다. 언제든 원하실 때 다시 가이드 활동을 시작하실 수 있습니다.
          </div>
        </Card>
      </div>
    </div>
  );
}
