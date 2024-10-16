"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");

    // 필수 쿼리 매개변수 유효성 검사
    if (!paymentIntent || !clientSecret || redirectStatus !== "succeeded") {
      router.replace("/");
    }
  }, [router, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="w-2/3">
        <div className="flex flex-col justify-center items-center">
          <CheckBadgeIcon className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
          <div className="text-xl font-semibold mb-2 text-gray-800">
            예약이 완료되었습니다!
          </div>
          <div className="text-gray-500 mb-6 text-center">
            가이드가 예약을 승인할 때까지 요금이 청구되지 않습니다. 가이드의
            승인을 기다려주세요.
          </div>
          <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    </div>
  );
}
