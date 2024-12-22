import { useTranslations } from "next-intl";

export const metadata = {
  title: "취소 및 환불 정책",
  description:
    "FGFG 서비스의 취소 및 환불 정책을 확인하세요. 예약 취소, 변경, 환불 절차 및 조건에 대해 명확하게 안내드립니다.",
};

export default function RefundPolicy() {
  const t = useTranslations();
  return (
    <div className="max-w-4xl mx-auto my-10 px-6">
      <div className="text-center font-bold text-3xl mb-6">
        {t("refundPolicy.title")}
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("refundPolicy.description")}
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("refundPolicy.description2")}
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("refundPolicy.description3")}
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            {t("refundPolicy.description4")}
          </p>
        </div>
        <div className="mt-4">{t("refundPolicy.contact")}</div>
        <div className="text-center text-sm text-gray-500">
          {t("refundPolicy.lastModified")}
        </div>
      </div>
    </div>
  );
}
