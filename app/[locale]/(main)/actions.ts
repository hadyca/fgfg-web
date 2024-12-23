"use server";
import { redirect } from "@/i18n/routing";
import { searchGuideSchema } from "./schema";
import { convertToUTC } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";

export async function searchGuide(formData: FormData) {
  const locale = await getLocale();
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
    redirect({
      href: {
        pathname: "/search-guide",
        query: {
          starttime: queryStartTime!,
          endtime: queryEndTime!,
        },
      },
      locale,
    });
  }
}
