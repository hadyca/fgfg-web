"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { FaInstagram } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import Link from "next/link";
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
          <div className="text-xl font-semibold text-gray-800">
            <div className="text-center">
              <span>{t("paymentSuccess.title")} </span>
              <span>
                {t("paymentSuccess.reservationNumber")}: {params?.reservationId}
              </span>
            </div>
            <div>{t("paymentSuccess.description")}</div>
          </div>
          <div className="flex flex-col gap-2 my-6">
            <div className="text-primary flex flex-row items-center gap-2">
              <FaInstagram className="size-6" />
              <Link
                href="https://www.instagram.com/fgfgglobal/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram DM
              </Link>
            </div>
            <div className="text-primary flex flex-row items-center gap-2">
              <RiKakaoTalkFill className="size-6" />
              <Link
                href="https://open.kakao.com/o/s4tBl8hh"
                target="_blank"
                rel="noopener noreferrer"
              >
                KakaoTalk Open Chat
              </Link>
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
