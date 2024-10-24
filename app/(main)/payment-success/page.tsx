"use client";

import { useRouter } from "next/navigation";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="w-2/3">
        <div className="flex flex-col justify-center items-center">
          <CheckBadgeIcon className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
          <div className="text-xl font-semibold mb-2 text-gray-800">
            예약이 완료되었습니다!
          </div>
          <div className="text-gray-500 mb-6 text-center">
            가이드의 승인을 기다려주세요.
          </div>
          <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    </div>
  );
}
