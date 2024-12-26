"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  pickupPlaceSchema,
  PickupPlaceType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updatePickupPlace } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";
import GoogleMapApi from "@/components/googleMapApi";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

interface PickupPlaceFormProps {
  pickupPlaceMain: string;
  pickupPlaceLat: number;
  pickupPlaceLng: number;
  pickupPlaceDetail: string;
}

export default function PickupPlaceForm({
  pickupPlaceMain,
  pickupPlaceLat,
  pickupPlaceLng,
  pickupPlaceDetail,
}: PickupPlaceFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PickupPlaceType>({
    resolver: zodResolver(pickupPlaceSchema(t)),
    defaultValues: {
      pickupPlaceMain,
      pickupPlaceLat,
      pickupPlaceLng,
      pickupPlaceDetail,
    },
  });

  const onValid = async (data: PickupPlaceType) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("pickupPlaceMain", data.pickupPlaceMain);
    formData.append("pickupPlaceLat", data.pickupPlaceLat.toString());
    formData.append("pickupPlaceLng", data.pickupPlaceLng.toString());
    formData.append("pickupPlaceDetail", data.pickupPlaceDetail);

    const { ok, error } = await updatePickupPlace(formData);
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
    } else {
      toast({
        description: t("profile.changeSuccess"),
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="mb-3">
        <div className="font-semibold mb-2">{t("profile.pickupPlace")}</div>
        {errors?.pickupPlaceMain ? (
          <ErrorText text={errors.pickupPlaceMain.message!} />
        ) : null}
        <GoogleMapApi
          defaultLat={pickupPlaceLat}
          defaultLng={pickupPlaceLng}
          defaultMain={pickupPlaceMain}
          onMarkerChange={(position) => {
            setValue("pickupPlaceLat", position.lat);
            setValue("pickupPlaceLng", position.lng);
          }}
          onInputValueChange={(value) => {
            setValue("pickupPlaceMain", value);
          }}
        />
      </div>
      <div>
        <div className="font-semibold">{t("profile.pickupPlaceDetail")}</div>
        <div className="text-sm text-muted-foreground mb-2">
          {t("profile.pickupPlaceDetailDescription")}
        </div>
        {errors?.pickupPlaceDetail ? (
          <ErrorText text={errors.pickupPlaceDetail.message!} />
        ) : null}
        <Textarea
          {...register("pickupPlaceDetail")}
          placeholder={t("profile.pickupPlaceDetailExample")}
          required
        />
      </div>
      <div className="flex justify-end mt-3">
        <Button disabled={loading}>
          {loading ? t("profile.loading") : t("profile.save")}
        </Button>
      </div>
    </form>
  );
}
