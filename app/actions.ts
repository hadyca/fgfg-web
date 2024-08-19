"use server";
import { DATE_REGEX, TIME_REGEX } from "@/lib/constants";
import { redirect } from "next/navigation";
import { z } from "zod";

// to-be : zod활용해서, 1)iso 형식이어야하고, 아니면 에러메시지 2) iso시간이 현재시간보다 과거로 되지 않게. 과거라면 에러 메시지 보여주기

const formSchema = z.object({
  date: z.string().regex(DATE_REGEX, "날짜를 다시 확인하세요."),
  startTime: z.string().regex(TIME_REGEX, "시각을 다시 확인하세요."),
  endTime: z.string().regex(TIME_REGEX, "시각을 다시 확인하세요."),
});

export async function getGuides(prevState: any, formData: FormData) {
  const data = {
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const startTime = `${result.data.date}T${result.data.startTime}:00.000Z`;
    const endTime = `${result.data.date}T${result.data.endTime}:00.000Z`;

    redirect(
      `/search-guide?startTime=${encodeURIComponent(
        startTime
      )}&endTime=${encodeURIComponent(endTime)}`
    );
  }
}
