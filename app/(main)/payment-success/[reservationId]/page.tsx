"use client";

import { useRouter } from "next/navigation";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

interface PaymentSuccessProps {
  params: {
    reservationId: number;
  };
}

export default function PaymentSuccess({ params }: PaymentSuccessProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="w-2/3">
        <div className="flex flex-col justify-center items-center">
          <CheckBadgeIcon className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
          <div className="text-xl font-semibold mb-2 text-gray-800">
            <div className="text-center">예약이 완료되었습니다!</div>
            <div>
              추가 결제 진행을 위해, 아래 예약 번호를 카카오톡 ID: rlawpgud로
              알려주세요.
            </div>
            <div className="text-center mt-2">
              예약 번호: {params?.reservationId}
            </div>
          </div>
          <div className="text-gray-500 mb-6 text-center">
            24시간 이내 추가 결제 진행을 하시지 않으면 예약은 자동 취소 됩니다.
            결제 후, 가이드의 승인을 기다려주세요.
          </div>
          <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    </div>
  );
}
