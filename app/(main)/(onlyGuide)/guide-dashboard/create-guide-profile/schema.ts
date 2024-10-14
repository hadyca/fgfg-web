import PhotosSchema from "@/lib/schema/PhotosSchema";
import { z } from "zod";

export const createGuideProfileSchema = z.object({
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
  guideIntro: z.string({ required_error: "필수 항목 입니다." }),
  pickupPlaceMain: z.string({ required_error: "필수 항목 입니다." }),
  pickupPlaceLat: z.coerce.number({ required_error: "필수 항목 입니다." }),
  pickupPlaceLng: z.coerce.number({ required_error: "필수 항목 입니다." }),
  pickupPlaceDetail: z.string({ required_error: "필수 항목 입니다." }),
});

export type CreateGuideProfileType = z.infer<typeof createGuideProfileSchema>;
