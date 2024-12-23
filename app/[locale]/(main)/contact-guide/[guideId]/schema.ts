import { z } from "zod";

export const contactGuideSchema = (t: (key: string) => string) =>
  z.object({
    payload: z.string({
      required_error: t("validation.contactGuide.requiredError"),
    }),
  });

export type ContactGuideType = z.infer<ReturnType<typeof contactGuideSchema>>;
