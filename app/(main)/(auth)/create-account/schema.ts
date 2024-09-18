import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_SPACE_REGEX,
  PASSWORD_SPECIAL_REGEX,
  UNAVAILABLE_USERNAME,
} from "@/lib/constants";
import { z } from "zod";

const unavailableUsername = (username: string) =>
  !UNAVAILABLE_USERNAME.includes(username);

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

export const createAccountSchema = z
  .object({
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
    email: z.string().email("이메일 주소를 입력해주세요.").toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "최소 8자 이상이어야 합니다.")
      .regex(PASSWORD_SPACE_REGEX, "공백은 입력 할 수 없습니다.")
      .regex(PASSWORD_SPECIAL_REGEX, "특수문자가 포함되어야 합니다."),

    confirm_password: z.string(),
  })
  .refine(checkPasswords, {
    message: "동일한 비밀번호를 입력해주세요.",
    path: ["confirm_password"],
  });

export type CreateAccountType = z.infer<typeof createAccountSchema>;
