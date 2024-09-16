import { z } from "zod";

const PhotosSchema = z.object({ id: z.number(), url: z.string() });

export const createGuideProfileSchema = z.object({
  guidePhotos: z.array(PhotosSchema).min(2, "2개 이상의 사진이 필요합니다."),
  personality: z.string({ required_error: "필수 항목 입니다." }),
  guideIntro: z
    .string({ required_error: "필수 항목 입니다." })
    .min(10, "더 길게 작성 해주세요."),
  pickupPlaceMain: z.string({ required_error: "필수 항목 입니다." }),
  pickupPlaceLat: z.coerce.number({ required_error: "필수 항목 입니다." }),
  pickupPlaceLng: z.coerce.number({ required_error: "필수 항목 입니다." }),
  pickupPlaceDetail: z.string({ required_error: "필수 항목 입니다." }),
});

export type CreateGuideProfileType = z.infer<typeof createGuideProfileSchema>;
