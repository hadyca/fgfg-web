"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EyeIcon } from "@heroicons/react/24/outline";
import FullnameForm from "./fullname-form";
import HeightForm from "./height-form";
import BirthdateForm from "./birthdate-form";
import LanguageForm from "./language-form";
import AddressForm from "./address-form";
import PhoneForm from "./phone-form";
import GuidePhotosForm from "./guidePhotos-form";

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
  personality: string;
  guideIntro: string;
  pickupPlaceMain: string;
  pickupPlaceLat: number;
  pickupPlaceLng: number;
  pickupPlaceDetail: string;
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
      </div>
      <Separator className="md:hidden my-10" />
      <div className="px-14">
        <Card className="p-6">
          <EyeIcon className="size-16" />
          <div className="text-lg font-semibold mb-2">
            다른 사람에게 어떤 정보가 공개되나요?
          </div>
          <div className="text-muted-foreground">
            유저명은 가이드와의 채팅 시 공개되며, 이메일은 공개되지 않습니다.
          </div>
        </Card>
      </div>
    </div>
  );
}
