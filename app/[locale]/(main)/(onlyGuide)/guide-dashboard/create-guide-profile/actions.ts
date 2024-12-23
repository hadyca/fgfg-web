"use server";

import { client } from "@/lib/apolloClient";
import { createGuideProfileSchema } from "./schema";
import { CREATE_GUIDE_PROFILE } from "./queries";
import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function createGuideProfile(formData: FormData) {
  const t = await getTranslations();
  const data = {
    guidePhotos: formData.get("guidePhotos")
      ? JSON.parse(formData.get("guidePhotos") as string)
      : null,
    personality: formData.get("personality"),
    guideIntro: formData.get("guideIntro"),
    pickupPlaceMain: formData.get("pickupPlaceMain"),
    pickupPlaceLat: formData.get("pickupPlaceLat"),
    pickupPlaceLng: formData.get("pickupPlaceLng"),
    pickupPlaceDetail: formData.get("pickupPlaceDetail"),
  };

  const result = createGuideProfileSchema(t).safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const {
      data: {
        createGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: CREATE_GUIDE_PROFILE,
      variables: {
        guidePhotos: result.data.guidePhotos,
        personality: result.data.personality,
        guideIntro: result.data.guideIntro,
        pickupPlaceMain: result.data.pickupPlaceMain,
        pickupPlaceLat: result.data.pickupPlaceLat,
        pickupPlaceLng: result.data.pickupPlaceLng,
        pickupPlaceDetail: result.data.pickupPlaceDetail,
      },
    });
    if (!ok) {
      return notFound();
    } else {
      redirect("/");
    }
  }
}
