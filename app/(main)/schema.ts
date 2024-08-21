import { DATE_REGEX, TIME_30_MIN_REGEX } from "@/lib/constants";
import { z } from "zod";

export const searchGuideSchema = z
  .object({
    date: z.string().regex(DATE_REGEX, "날짜를 다시 확인하세요."),
    startTime: z.string().regex(TIME_30_MIN_REGEX, "시각을 다시 확인하세요."),
    endTime: z.string().regex(TIME_30_MIN_REGEX, "시각을 다시 확인하세요."),
  })
  .superRefine(({ date, startTime, endTime }, ctx) => {
    const startDate = new Date(`${date}T${startTime}`);
    const endDate = new Date(`${date}T${endTime}`);
    const timeDifference = endDate.getTime() - startDate.getTime(); // 밀리초 단위의 차이
    const threeHoursInMilliseconds = 3 * 60 * 60 * 1000; // 3시간을 밀리초로 변환

    if (timeDifference < threeHoursInMilliseconds) {
      ctx.addIssue({
        code: "custom",
        message: "최소 가이드 시간은 3시간 입니다.",
        path: ["startTime"],
      });
    }
  });

export type SearchGuideType = z.infer<typeof searchGuideSchema>;
