import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().toLowerCase(),
  password: z.string({
    required_error: "비밀번호를 입력해주세요.",
  }),
});

export type LoginType = z.infer<typeof loginSchema>;
