import PhotosSchema from "@/lib/schema/PhotosSchema";
import { z } from "zod";

export const createGuideProfileSchema = (t: (key: string) => string) =>
  z.object({
    guidePhotos: z
      .array(PhotosSchema)
      .min(2, t("validation.createGuideProfile.minimumPhotos"))
      .refine(
        (guidePhotos) =>
          guidePhotos.some(
            (photo) => photo !== null && photo.fileUrlOrder === 1
          ),
        {
          message: t("validation.createGuideProfile.representativePhoto"),
        }
      ),
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
      {
        errorMap: () => ({
          message: t("validation.createGuideProfile.invalidPersonality"),
        }),
      }
    ),
    guideIntro: z.string({
      required_error: t("validation.createGuideProfile.required_error"),
    }),
    pickupPlaceMain: z.string({
      required_error: t("validation.createGuideProfile.required_error"),
    }),
    pickupPlaceLat: z.coerce.number({
      required_error: t("validation.createGuideProfile.required_error"),
    }),
    pickupPlaceLng: z.coerce.number({
      required_error: t("validation.createGuideProfile.required_error"),
    }),
    pickupPlaceDetail: z.string({
      required_error: t("validation.createGuideProfile.required_error"),
    }),
  });

export type CreateGuideProfileType = z.infer<
  ReturnType<typeof createGuideProfileSchema>
>;
