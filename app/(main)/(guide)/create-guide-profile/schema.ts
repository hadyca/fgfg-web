import { z } from "zod";

const PhotosSchema = z.object({ id: z.number(), url: z.string() });

export const createGuideProfileSchema = z.object({
  photos: z
    .array(PhotosSchema)
    .refine((photos) => photos.some((photo) => photo.id === 1), {
      message: "대표 사진을 등록 해주세요.",
    }),
  personality: z.string({ required_error: "필수 항목 입니다." }),
  guideIntro: z
    .string({ required_error: "필수 항목 입니다." })
    .min(10, "더 길게 작성 해주세요."),
});

export type CreateGuideProfileType = z.infer<typeof createGuideProfileSchema>;
