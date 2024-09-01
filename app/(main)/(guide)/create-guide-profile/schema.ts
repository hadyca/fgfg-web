import { z } from "zod";

export const createGuideProfileSchema = z.object({
  photos: z.string({
    required_error: "필수 항목 입니다.",
  }),
  personality: z.string({ required_error: "필수 항목 입니다." }),
  height: z.string({ required_error: "필수 항목 입니다." }).refine(
    (val) => {
      const height = Number(val);
      return !isNaN(height) && height >= 100 && height <= 200;
    },
    {
      message: "키를 다시 확인 해주세요.",
    }
  ),
  guideIntro: z
    .string({ required_error: "필수 항목 입니다." })
    .min(10, "더 길게 작성 해주세요."),
});

export type CreateGuideProfileType = z.infer<typeof createGuideProfileSchema>;
