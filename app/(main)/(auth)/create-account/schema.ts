import { PASSWORD_MIN_LENGTH, UNAVAILABLE_USERNAME } from "@/lib/constants";
import { z } from "zod";

const unavailableUsername = (username: string) =>
  !UNAVAILABLE_USERNAME.includes(username);

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

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
      .min(PASSWORD_MIN_LENGTH, "최소 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine(checkPasswords, {
    message: "동일한 비밀번호를 입력해주세요.",
    path: ["confirmPassword"],
  });

export type CreateAccountType = z.infer<typeof createAccountSchema>;
