import { UNAVAILABLE_USERNAME } from "@/lib/constants";
import validator from "validator";
import { z } from "zod";

const unavailableName = (username: string) =>
  !UNAVAILABLE_USERNAME.includes(username);

export const signUpGuideSchema = z.object({
  fullname: z
    .string({
      required_error: "필수 항목 입니다.",
    })
    .toLowerCase()
    .min(1, "이름을 다시 확인 해주세요.")
    .refine(unavailableName, "사용할 수 없는 이름 입니다."),
  birthdate: z.string({
    required_error: "필수 항목 입니다.",
  }),
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
});

export type SignUpGuideType = z.infer<typeof signUpGuideSchema>;
