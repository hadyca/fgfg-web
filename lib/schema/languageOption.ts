import { z } from "zod";

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

export default LanguageOptionSchema;
