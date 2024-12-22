import { BIRTHDATE_REGEX } from "@/lib/constants";
import LanguageOptionSchema from "@/lib/schema/languageOption";
import unAvailableName from "@/lib/schema/unAvailableName";
import validator from "validator";
import { DateTime } from "luxon";
import { z } from "zod";

export const signUpGuideSchema = (t: (key: string) => string) =>
  z.object({
    fullname: z
      .string({
        required_error: t("validation.signUpGuide.required_error"),
      })
      .toLowerCase()
      .min(1, "Please check your name again.")
      .max(30, { message: "Maximum 30 characters allowed." })
      .refine(unAvailableName, t("validation.signUpGuide.invalidUsername")),
    birthdate: z
      .string({
        required_error: t("validation.signUpGuide.required_error"),
      })
      .regex(BIRTHDATE_REGEX, t("validation.signUpGuide.invalidBirthdate"))
      .refine(
        (date) => {
          const today = DateTime.now().startOf("day");
          const birthDate = DateTime.fromISO(date).startOf("day");

          const minDate = today.minus({ years: 70 });
          const maxDate = today.minus({ years: 15 });

          return birthDate >= minDate && birthDate <= maxDate;
        },
        {
          message: t("validation.signUpGuide.invalidBirthdate"),
        }
      ),
    height: z
      .string({ required_error: t("validation.signUpGuide.required_error") })
      .refine(
        (val) => {
          const height = Number(val);
          return !isNaN(height) && height >= 100 && height <= 200;
        },
        {
          message: t("validation.signUpGuide.invalidHeight"),
        }
      ),
    address: z.string({
      required_error: t("validation.signUpGuide.required_error"),
    }),
    phone: z
      .string({
        required_error: t("validation.signUpGuide.required_error"),
      })
      .trim()
      .refine(
        (phone) => validator.isMobilePhone(phone, "vi-VN"),
        t("validation.signUpGuide.invalidPhone")
      ),
    selfIntro: z.string(),
    resumePhoto: z.string({
      required_error: t("validation.signUpGuide.required_error"),
    }),
    language: z.array(LanguageOptionSchema),
  });

export type SignUpGuideType = z.infer<ReturnType<typeof signUpGuideSchema>>;
