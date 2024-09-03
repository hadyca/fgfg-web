import { z } from "zod";

const PhotosSchema = z.object({ id: z.number(), url: z.string() });

export const createGuideProfileSchema = z.object({
  photos: z.array(PhotosSchema).min(2, "2개 이상의 사진이 필요합니다."),
  personality: z.string({ required_error: "필수 항목 입니다." }),
  guideIntro: z
    .string({ required_error: "필수 항목 입니다." })
    .min(10, "더 길게 작성 해주세요."),
});

export type CreateGuideProfileType = z.infer<typeof createGuideProfileSchema>;
