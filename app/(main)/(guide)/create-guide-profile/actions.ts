"use server";

import { client } from "@/lib/apolloClient";
import { createGuideProfileSchema } from "./schema";
import { CREATE_GUIDE_PROFILE } from "./queries";
import { redirect } from "next/navigation";

export async function createGuideProfile(formData: FormData) {
  const data = {
    photos: formData.get("photos")
      ? JSON.parse(formData.get("photos") as string)
      : null,
    personality: formData.get("personality"),
    guideIntro: formData.get("guideIntro"),
  };

  const result = createGuideProfileSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    await client.mutate({
      mutation: CREATE_GUIDE_PROFILE,
      variables: {
        photos: result.data.photos,
        personality: result.data.personality,
        guideIntro: result.data.guideIntro,
      },
    });
    //가이드 프로필 상세 페이지로 리다이렉팅
    redirect("/");
  }
}
