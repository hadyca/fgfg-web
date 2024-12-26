import { PASSWORD_MIN_LENGTH, UNAVAILABLE_USERNAME } from "@/lib/constants";
import { z } from "zod";

const unavailableUsername = (username: string) =>
  !UNAVAILABLE_USERNAME.includes(username);

export const usernameSchema = (t: (key: string) => string) =>
  z.object({
    username: z
      .string({
        invalid_type_error: t("validation.account.invalidUsername"),
        required_error: t("validation.account.requiredError"),
      })
      .toLowerCase()
      .min(1, { message: t("validation.account.usernameRequired") })
      .max(30, { message: t("validation.account.maximumUsernameLength") })
      .trim()
      .refine(unavailableUsername, t("validation.account.unavailableUsername")),
  });

export type UsernameType = z.infer<ReturnType<typeof usernameSchema>>;

export const emailSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("validation.account.invalidEmail")).toLowerCase(),
  });

export type EmailType = z.infer<ReturnType<typeof emailSchema>>;

const checkPasswords = ({
  newPassword,
  confirmPassword,
}: {
  newPassword: string;
  confirmPassword: string;
}) => newPassword === confirmPassword;

export const passwordSchema = (t: (key: string) => string) =>
  z
    .object({
      password: z.string({
        required_error: t("validation.account.requiredError"),
      }),
      newPassword: z
        .string()
        .min(
          PASSWORD_MIN_LENGTH,
          t("validation.account.minimumPasswordLength")
        ),
      confirmPassword: z.string({
        required_error: t("validation.account.passwordRequired"),
      }),
    })
    .refine(checkPasswords, {
      message: t("validation.account.samePassword"),
      path: ["confirmPassword"],
    });

export type PasswordType = z.infer<ReturnType<typeof passwordSchema>>;
