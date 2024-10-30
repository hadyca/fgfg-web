export const metadata = {
  title: "취소 및 환불 정책",
  description:
    "FGFG 서비스의 취소 및 환불 정책을 확인하세요. 예약 취소, 변경, 환불 절차 및 조건에 대해 명확하게 안내드립니다.",
};

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto my-10 px-6">
      <div className="text-center font-bold text-3xl mb-6">
        취소 및 환불정책
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            가이드 요청으로 인한 예약 취소나 가이드가 예약을 이행하지 않은
            경우(No Show)에는 전액 환불해드립니다.
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            고객님이 예약 시간에 나타나지 않은 경우(No Show), 환불이
            불가능합니다.
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            가이드가 예약을 확정한 이후에는 예약 취소 및 환불이 불가능합니다.
          </p>
        </div>
        <div className="relative pl-3">
          <p className="before:content-['•'] before:absolute before:left-0 before:text-black">
            단순히 가이드 서비스에 대한 불만족으로 인한 환불은 불가능합니다.
          </p>
        </div>
      </div>
      <div className="mt-4">
        환불 요청 및 문의 사항이 있으시면 아래 이메일로 연락해 주시기 바랍니다.
      </div>
      <div>이메일: hadycas@gmail.com</div>
    </div>
  );
}
