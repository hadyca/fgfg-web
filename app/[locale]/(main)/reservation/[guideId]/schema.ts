import { z } from "zod";

export const reservationSchema = (t: (key: string) => string) =>
  z.object({
    payload: z.string({
      required_error: t("validation.reservation.requiredError"),
    }),
    customerAgeRange: z.enum(
      ["20~25", "26~30", "31~35", "36~40", "41~45", "46~50", "51~55", "56~60"],
      {
        errorMap: () => ({
          message: t("validation.reservation.customerAgeRange"),
        }),
      }
    ),
  });

export type ReservationType = z.infer<ReturnType<typeof reservationSchema>>;
