import { z } from "zod";

const BanknamesEnum = z.enum([
  "Vietcombank",
  "VietinBank",
  "BIDV",
  "Techcombank",
  "Sacombank",
  "VPBank",
  "MB Bank",
  "ACB",
  "TPBank",
  "Eximbank",
  "HDBank",
  "HSBC Vietnam",
  "Citibank Vietnam",
  "ANZ Vietnam",
  "Shinhan Bank",
  "Woori Bank",
  "Standard Chartered Bank",
  "Deutsche Bank",
]);

export const bankSchema = z.object({
  bankname: BanknamesEnum,
  bankAccount: z.coerce
    .string({ required_error: "필수 항목 입니다." }) // 숫자를 문자열로 변환
    .refine((val) => /^\d+$/.test(val), {
      message: "계좌 번호는 숫자만 입력해야 합니다.",
    }),
});

export type BankType = z.infer<typeof bankSchema>;
