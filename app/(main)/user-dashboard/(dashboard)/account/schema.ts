import { UNAVAILABLE_USERNAME } from "@/lib/constants";
import { z } from "zod";

const unavailableUsername = (username: string) =>
  !UNAVAILABLE_USERNAME.includes(username);

export const usernameSchema = z.object({
  username: z
    .string({
      invalid_type_error: "문자를 넣어주세요.",
      required_error: "필수 항목 입니다.",
    })
    .toLowerCase()
    .min(1, { message: "유저명을 입력해 주세요." })
    .max(30, { message: "최대 30자 까지 가능합니다." })
    .trim()
    .refine(unavailableUsername, "사용할 수 없는 유저명입니다."),
});

export type UsernameType = z.infer<typeof usernameSchema>;
