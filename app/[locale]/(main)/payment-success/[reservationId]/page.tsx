"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface PaymentSuccessProps {
  params: {
    reservationId: number;
  };
}

export default function PaymentSuccess({ params }: PaymentSuccessProps) {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="w-2/3">
        <div className="flex flex-col justify-center items-center">
          <CheckBadgeIcon className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
          <div className="text-xl font-semibold mb-2 text-gray-800">
            <div className="text-center">{t("paymentSuccess.title")}</div>
            <div>{t("paymentSuccess.description")}</div>
            <div className="text-center mt-2">
              {t("paymentSuccess.reservationNumber")}: {params?.reservationId}
            </div>
          </div>
          <div className="text-gray-500 mb-6 text-center">
            {t("paymentSuccess.reservationCanceled")}
          </div>
          <Button>
            <a href="/">{t("paymentSuccess.goToHome")}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
