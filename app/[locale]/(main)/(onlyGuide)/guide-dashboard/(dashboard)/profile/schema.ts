import { BIRTHDATE_REGEX } from "@/lib/constants";
import PhotosSchema from "@/lib/schema/PhotosSchema";
import unAvailableName from "@/lib/schema/unAvailableName";
import { DateTime } from "luxon";
import validator from "validator";
import { z } from "zod";

export const fullnameSchema = (t: (key: string) => string) =>
  z.object({
    fullname: z
      .string({
        required_error: t("validation.profile.required"),
      })
      .toLowerCase()
      .min(1, t("validation.profile.checkNameAgain"))
      .max(30, t("validation.profile.maximumNameLength"))
      .refine(unAvailableName, t("validation.profile.unavailableName")),
  });

export type FullnameType = z.infer<ReturnType<typeof fullnameSchema>>;

export const birthdateSchema = (t: (key: string) => string) =>
  z.object({
    birthdate: z
      .string({
        required_error: t("validation.profile.required"),
      })
      .regex(BIRTHDATE_REGEX, t("validation.profile.checkBirthdateAgain"))
      .refine(
        (date) => {
          const today = DateTime.now().startOf("day");
          const birthDate = DateTime.fromISO(date).startOf("day");

          const minDate = today.minus({ years: 70 });
          const maxDate = today.minus({ years: 15 });

          return birthDate >= minDate && birthDate <= maxDate;
        },
        {
          message: t("validation.profile.checkBirthdateAgain"),
        }
      ),
  });

export type BirthdateType = z.infer<ReturnType<typeof birthdateSchema>>;

export const heightSchema = (t: (key: string) => string) =>
  z.object({
    height: z
      .string({ required_error: t("validation.profile.required") })
      .refine(
        (val) => {
          const height = Number(val);
          return !isNaN(height) && height >= 100 && height <= 200;
        },
        {
          message: t("validation.profile.checkHeightAgain"),
        }
      ),
  });

export type HeightType = z.infer<ReturnType<typeof heightSchema>>;

export const addressSchema = (t: (key: string) => string) =>
  z.object({
    address: z.string({
      required_error: t("validation.profile.required"),
    }),
  });

export type AddressType = z.infer<ReturnType<typeof addressSchema>>;

export const phoneSchema = (t: (key: string) => string) =>
  z.object({
    phone: z
      .string({
        required_error: t("validation.profile.required"),
      })
      .trim()
      .refine((phone) => validator.isMobilePhone(phone, "vi-VN"), {
        message: t("validation.profile.invalidPhone"),
      }),
  });

export type PhoneType = z.infer<ReturnType<typeof phoneSchema>>;

const LanguageOptionSchema = (t: (key: string) => string) =>
  z
    .object({
      id: z.number(),
      language: z.string(),
      level: z.string(),
    })
    .refine(
      (data) => {
        const hasLanguage = data.language.trim() !== "";
        const hasLevel = data.level.trim() !== "";

        // 둘 다 값이 있는 경우에만 유효
        return (hasLanguage && hasLevel) || (!hasLanguage && !hasLevel);
      },
      {
        message: t("validation.profile.languageAndLevel"),
      }
    );

export const languageSchema = (t: (key: string) => string) =>
  z.object({
    language: z.array(LanguageOptionSchema(t)),
  });

export type LanguageType = z.infer<ReturnType<typeof languageSchema>>;

export const guidePhotosSchema = (t: (key: string) => string) =>
  z.object({
    guidePhotos: z
      .array(PhotosSchema)
      .min(2, t("validation.profile.minimumPhotos"))
      .refine(
        (guidePhotos) =>
          guidePhotos.some(
            (photo) => photo !== null && photo.fileUrlOrder === 1
          ),
        {
          message: t("validation.profile.representativePhoto"),
        }
      ),
  });

export type GuidePhotosType = z.infer<ReturnType<typeof guidePhotosSchema>>;

export const personalitySchema = (t: (key: string) => string) =>
  z.object({
    personality: z.enum(
      [
        "CUTE",
        "SEXY",
        "UNIQUE",
        "ACTIVE",
        "CALM",
        "FRIENDLY",
        "POSITIVE",
        "HUMOROUS",
        "INTELLIGENT",
        "CHARMING",
      ],
      { errorMap: () => ({ message: t("validation.profile.personality") }) }
    ),
  });

export type PersonalityType = z.infer<ReturnType<typeof personalitySchema>>;

export const guideIntroSchema = (t: (key: string) => string) =>
  z.object({
    guideIntro: z.string({ required_error: t("validation.profile.required") }),
  });

export type GuideIntroType = z.infer<ReturnType<typeof guideIntroSchema>>;

export const pickupPlaceSchema = (t: (key: string) => string) =>
  z.object({
    pickupPlaceMain: z.string({
      required_error: t("validation.profile.required"),
    }),
    pickupPlaceLat: z.coerce.number({
      required_error: t("validation.profile.required"),
    }),
    pickupPlaceLng: z.coerce.number({
      required_error: t("validation.profile.required"),
    }),
    pickupPlaceDetail: z.string({
      required_error: t("validation.profile.required"),
    }),
  });

export type PickupPlaceType = z.infer<ReturnType<typeof pickupPlaceSchema>>;
