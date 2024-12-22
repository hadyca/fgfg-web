import { DATE_REGEX, TIME_30_MIN_REGEX } from "@/lib/constants";
import { z } from "zod";
import { DateTime } from "luxon";

export const searchGuideSchema = (t: (key: string) => string) =>
  z
    .object({
      date: z.string().regex(DATE_REGEX, t("validation.invalidDate")),
      startTime: z
        .string()
        .regex(TIME_30_MIN_REGEX, t("validation.invalidTime")),
      endTime: z.string().regex(TIME_30_MIN_REGEX, t("validation.invalidTime")),
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
          message: t("validation.minimumDuration"),
          path: ["startTime"],
        });
      }

      if (startDate <= vietnamNow) {
        ctx.addIssue({
          code: "custom",
          message: t("validation.checkTimeAgain"),
          path: ["startTime"],
        });
      }
    });

export type SearchGuideType = z.infer<ReturnType<typeof searchGuideSchema>>;
