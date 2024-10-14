import { BIRTHDATE_REGEX } from "@/lib/constants";
import PhotosSchema from "@/lib/schema/PhotosSchema";
import unAvailableName from "@/lib/schema/unAvailableName";
import { DateTime } from "luxon";
import validator from "validator";
import { z } from "zod";

export const fullnameSchema = z.object({
  fullname: z
    .string({
      required_error: "필수 항목 입니다.",
    })
    .toLowerCase()
    .min(1, "이름을 다시 확인 해주세요.")
    .max(30, { message: "최대 30자 까지 가능합니다." })
    .refine(unAvailableName, "사용할 수 없는 이름 입니다."),
});

export type FullnameType = z.infer<typeof fullnameSchema>;

export const birthdateSchema = z.object({
  birthdate: z
    .string({
      required_error: "필수 항목 입니다.",
    })
    .regex(BIRTHDATE_REGEX, "생년월일을 다시 확인해주세요.")
    .refine(
      (date) => {
        const today = DateTime.now().startOf("day");
        const birthDate = DateTime.fromISO(date).startOf("day");

        const minDate = today.minus({ years: 70 });
        const maxDate = today.minus({ years: 15 });

        return birthDate >= minDate && birthDate <= maxDate;
      },
      {
        message: "생년월일을 다시 확인해주세요.",
      }
    ),
});

export type BirthdateType = z.infer<typeof birthdateSchema>;

export const heightSchema = z.object({
  height: z.string({ required_error: "필수 항목 입니다." }).refine(
    (val) => {
      const height = Number(val);
      return !isNaN(height) && height >= 100 && height <= 200;
    },
    {
      message: "키를 다시 확인 해주세요.",
    }
  ),
});

export type HeightType = z.infer<typeof heightSchema>;

export const addressSchema = z.object({
  address: z.string({
    required_error: "필수 항목 입니다.",
  }),
});

export type AddressType = z.infer<typeof addressSchema>;

export const phoneSchema = z.object({
  phone: z
    .string({
      required_error: "필수 항목 입니다.",
    })
    .trim()
    .refine(
      (phone) => validator.isMobilePhone(phone, "vi-VN"),
      "잘못된 번호 입니다."
    ),
});

export type PhoneType = z.infer<typeof phoneSchema>;

const LanguageOptionSchema = z
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
      message: "언어와 레벨은 둘 다 값이 있어야 합니다.",
    }
  );

export const languageSchema = z.object({
  language: z.array(LanguageOptionSchema),
});

export type LanguageType = z.infer<typeof languageSchema>;

export const guidePhotosSchema = z.object({
  guidePhotos: z
    .array(PhotosSchema)
    .min(2, "2개 이상의 사진이 필요합니다.")
    .refine(
      (guidePhotos) =>
        guidePhotos.some((photo) => photo !== null && photo.fileUrlOrder === 1),
      {
        message: "대표 사진을 추가해주세요.",
      }
    ),
});

export type GuidePhotosType = z.infer<typeof guidePhotosSchema>;

export const personalitySchema = z.object({
  personality: z.enum(
    [
      "귀엽고 발랄한",
      "섹시하고 매혹적인",
      "엉뚱하고 독특한",
      "활발하고 명랑한",
      "차분하고 따뜻한",
      "친절하고 상냥한",
      "긍정적이고 밝은",
      "유머러스하고 재치있는",
      "지적이고 신중한",
      "매력적이고 세련된",
    ],
    { errorMap: () => ({ message: "성격을 선택해주세요." }) }
  ),
});

export type PersonalityType = z.infer<typeof personalitySchema>;

export const guideIntroSchema = z.object({
  guideIntro: z.string({ required_error: "필수 항목 입니다." }),
});

export type GuideIntroType = z.infer<typeof guideIntroSchema>;

export const pickupPlaceSchema = z.object({
  pickupPlaceMain: z.string({ required_error: "필수 항목 입니다." }),
  pickupPlaceLat: z.coerce.number({ required_error: "필수 항목 입니다." }),
  pickupPlaceLng: z.coerce.number({ required_error: "필수 항목 입니다." }),
  pickupPlaceDetail: z.string({ required_error: "필수 항목 입니다." }),
});

export type PickupPlaceType = z.infer<typeof pickupPlaceSchema>;
