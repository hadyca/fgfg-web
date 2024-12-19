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

export const createAccountSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z
        .string({
          invalid_type_error: "Please enter text.",
          required_error: "This field is required.",
        })
        .toLowerCase()
        .min(1, { message: "Please enter a username." })
        .max(30, { message: "Maximum 30 characters allowed." })
        .trim()
        .refine(
          unavailableUsername,
          t("Validation.createAccount.invalidUsername")
        ),
      email: z
        .string()
        .email(t("Validation.createAccount.invalidEmail"))
        .toLowerCase(),
      password: z
        .string()
        .min(
          PASSWORD_MIN_LENGTH,
          t("Validation.createAccount.invalidPassword")
        ),
      confirmPassword: z.string(),
    })
    .refine(checkPasswords, {
      message: t("Validation.createAccount.invalidConfirmPassword"),
      path: ["confirmPassword"],
    });

export type CreateAccountType = z.infer<ReturnType<typeof createAccountSchema>>;
