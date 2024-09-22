import { z } from "zod";

export const contactGuideSchema = z.object({
  payload: z.string({
    required_error: "필수 항목 입니다.",
  }),
});

export type ContactGuideType = z.infer<typeof contactGuideSchema>;
