import { UNAVAILABLE_USERNAME } from "@/lib/constants";
import validator from "validator";
import { z } from "zod";

const unavailableName = (username: string) =>
  !UNAVAILABLE_USERNAME.includes(username);

export const signUpGuideSchema = z.object({
  fullname: z
    .string()
    .toLowerCase()
    .min(1, "이름을 다시 확인 해주세요.")
    .refine(unavailableName, "사용할 수 없는 이름 입니다."),
  birthdate: z.string(),
  address: z.string(),
  phone: z
    .string()
    .trim()
    .refine(
      (phone) => validator.isMobilePhone(phone, "vi-VN"),
      "Wrong phone format"
    ),
  selfIntro: z.string(),
});

export type SignUpGuideType = z.infer<typeof signUpGuideSchema>;
