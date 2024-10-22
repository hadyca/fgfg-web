import { BIRTHDATE_REGEX } from "@/lib/constants";
import LanguageOptionSchema from "@/lib/schema/languageOption";
import unAvailableName from "@/lib/schema/unAvailableName";
import validator from "validator";
import { DateTime } from "luxon";
import { z } from "zod";

export const signUpGuideSchema = z.object({
  fullname: z
    .string({
      required_error: "필수 항목 입니다.",
    })
    .toLowerCase()
    .min(1, "이름을 다시 확인 해주세요.")
    .max(30, { message: "최대 30자 까지 가능합니다." })
    .refine(unAvailableName, "사용할 수 없는 이름 입니다."),
  birthdate: z
    .string({
      required_error: "필수 항목 입니다.",
    })
    .regex(BIRTHDATE_REGEX, "생년월일을 다시 확인해주세요.")
    .refine(
      (date) => {
        const today = DateTime.now().startOf("day");
        const birthDate = DateTime.fromISO(date).startOf("day");

        const minDate = today.minus({ years: 70 });
        const maxDate = today.minus({ years: 15 });

        return birthDate >= minDate && birthDate <= maxDate;
      },
      {
        message: "생년월일을 다시 확인해주세요.",
      }
    ),
  height: z.string({ required_error: "필수 항목 입니다." }).refine(
    (val) => {
      const height = Number(val);
      return !isNaN(height) && height >= 100 && height <= 200;
    },
    {
      message: "키를 다시 확인 해주세요.",
    }
  ),
  address: z.string({
    required_error: "필수 항목 입니다.",
  }),
  phone: z
    .string({
      required_error: "필수 항목 입니다.",
    })
    .trim()
    .refine(
      (phone) => validator.isMobilePhone(phone, "vi-VN"),
      "잘못된 번호 입니다."
    ),
  selfIntro: z.string(),
  resumePhoto: z.string({
    required_error: "필수 항목 입니다.",
  }),
  language: z.array(LanguageOptionSchema),
});

export type SignUpGuideType = z.infer<typeof signUpGuideSchema>;
