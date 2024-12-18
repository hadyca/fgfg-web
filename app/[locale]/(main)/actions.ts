"use server";
import { redirect } from "next/navigation";
import { createSearchGuideSchema } from "./schema";
import { convertToUTC } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function searchGuide(formData: FormData) {
  const t = await getTranslations();

  const data = {
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };

  const result = createSearchGuideSchema(t).safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터" };
  } else {
    const queryStartTime = convertToUTC(
      `${result.data.date}T${result.data.startTime}`
    );
    const queryEndTime = convertToUTC(
      `${result.data.date}T${result.data.endTime}`
    );
    redirect(
      `/search-guide?starttime=${encodeURIComponent(
        queryStartTime!
      )}&endtime=${encodeURIComponent(queryEndTime!)}`
    );
  }
}
