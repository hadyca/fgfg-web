import { DATE_REGEX, TIME_30_MIN_REGEX } from "@/lib/constants";
import { z } from "zod";
import { DateTime } from "luxon";

export const searchGuideSchema = z
  .object({
    date: z.string().regex(DATE_REGEX, "날짜를 다시 확인하세요."),
    startTime: z.string().regex(TIME_30_MIN_REGEX, "시각을 다시 확인하세요."),
    endTime: z.string().regex(TIME_30_MIN_REGEX, "시각을 다시 확인하세요."),
  })
  .superRefine(({ date, startTime, endTime }, ctx) => {
    const startDate = DateTime.fromISO(`${date}T${startTime}`, {
      zone: "Asia/Ho_Chi_Minh",
    });
    const endDate = DateTime.fromISO(`${date}T${endTime}`, {
      zone: "Asia/Ho_Chi_Minh",
    });
    const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
    const vietnamNow = DateTime.now().setZone("Asia/Ho_Chi_Minh");

    const timeDifference = endDate.toMillis() - startDate.toMillis();

    if (timeDifference < twoHoursInMilliseconds) {
      ctx.addIssue({
        code: "custom",
        message: "최소 이용 시간은 2시간 입니다.",
        path: ["startTime"],
      });
    }

    if (startDate <= vietnamNow) {
      ctx.addIssue({
        code: "custom",
        message: "픽업시각은 현지시각 기준입니다. 시간을 다시 확인해주세요.",
        path: ["startTime"],
      });
    }
  });

export type SearchGuideType = z.infer<typeof searchGuideSchema>;
