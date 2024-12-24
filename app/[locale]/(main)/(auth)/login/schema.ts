import { z } from "zod";

export const loginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().toLowerCase(),
    password: z.string({
      required_error: t("validation.login.requiredError"),
    }),
  });

export type LoginType = z.infer<ReturnType<typeof loginSchema>>;
