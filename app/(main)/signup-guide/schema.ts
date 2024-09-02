import { BIRTHDATE_REGEX, UNAVAILABLE_USERNAME } from "@/lib/constants";
import validator from "validator";
import { z } from "zod";

const unavailableName = (username: string) =>
  !UNAVAILABLE_USERNAME.includes(username);

const LanguageOptionSchema = z
  .object({
    id: z.number(),
    language: z.string(),
    level: z.string(),
  })
  .refine(
    (data) => {
      const hasLanguage = data.language.trim() !== "";
      const hasLevel = data.level.trim() !== "";

      // 둘 다 값이 있는 경우에만 유효
      return (hasLanguage && hasLevel) || (!hasLanguage && !hasLevel);
    },
    {
      message: "언어와 레벨은 둘 다 값이 있어야 합니다.",
    }
  );

export const signUpGuideSchema = z.object({
  fullname: z
    .string({
      required_error: "필수 항목 입니다.",
    })
    .toLowerCase()
    .min(1, "이름을 다시 확인 해주세요.")
    .refine(unavailableName, "사용할 수 없는 이름 입니다."),
  birthdate: z
    .string({
      required_error: "필수 항목 입니다.",
    })
    .regex(BIRTHDATE_REGEX, "생년월일을 다시 확인해주세요."),
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
  photo: z.string({
    required_error: "필수 항목 입니다.",
  }),
  language: z.array(LanguageOptionSchema),
});

export type SignUpGuideType = z.infer<typeof signUpGuideSchema>;
