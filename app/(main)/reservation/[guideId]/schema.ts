import { z } from "zod";

export const reservationSchema = z.object({
  payload: z.string({
    required_error: "필수 항목 입니다.",
  }),
  customerAgeRange: z.enum(
    [
      "20~25세",
      "26~30세",
      "31~35세",
      "36~40세",
      "41~45세",
      "46~50세",
      "51~55세",
      "56~60세",
      "60세 이상",
    ],
    {
      errorMap: () => ({ message: "올바른 연령대를 선택해주세요." }),
    }
  ),
});

export type ReservationType = z.infer<typeof reservationSchema>;
