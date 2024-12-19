"use server";

import { client } from "@/lib/apolloClient";
import { SEE_AVAILABLE_GUIDES } from "./queries";
import { convertToUTC } from "@/lib/utils";
import { searchGuideSchema } from "../schema";
import { getTranslations } from "next-intl/server";

export async function getGuides(startTime?: string, endTime?: string) {
  const { data } = await client.query({
    query: SEE_AVAILABLE_GUIDES,
    variables: {
      startTime,
      endTime,
    },
    fetchPolicy: "no-cache",
  });
  return data;
}

export async function searchGuide(formData: FormData) {
  const t = await getTranslations();
  const data = {
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };
  const result = searchGuideSchema(t).safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터" };
  } else {
    const queryStartTime = convertToUTC(
      `${result.data.date}T${result.data.startTime}`
    );
    const queryEndTime = convertToUTC(
      `${result.data.date}T${result.data.endTime}`
    );

    return {
      ok: true,
      redirect: `/search-guide?starttime=${encodeURIComponent(
        queryStartTime!
      )}&endtime=${encodeURIComponent(queryEndTime!)}`,
    };
  }
}
