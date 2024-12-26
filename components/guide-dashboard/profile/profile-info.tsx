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
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
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
            {t("profile.otherInformation")}
          </div>
          <div className="text-muted-foreground">
            {t("profile.otherInformationDescription")}
          </div>
          <Separator className="my-6" />
          <LockClosedIcon className="size-16" strokeWidth={1.2} />
          <div className="text-lg font-semibold mb-2">
            {t("profile.inactive")}
          </div>
          <div className="text-muted-foreground">
            {t("profile.inactiveDescription")}
          </div>
        </Card>
      </div>
    </div>
  );
}
