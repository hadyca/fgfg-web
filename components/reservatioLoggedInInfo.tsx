import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { ClockIcon } from "@heroicons/react/24/outline";

interface ReservationLoggedInInfoProps {
  isMe: Boolean;
}

export default function ReservationLoggedInInfo({
  isMe,
}: ReservationLoggedInInfoProps) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="text-xl">결제 수단</div>
          <div>stripe 결제 부분(추 후)</div>
        </div>
        <Separator className="my-8" />
        {!isMe ? (
          <>
            <div>
              <div className="text-xl">가이드에게 메시지 보내기</div>
              <div className="text-sm text-muted-foreground">
                고객님께서 원하시는 데이트 코스, 가이드가 필요한 준비물,
                가이드를 선택한 이유 등을 알려주세요.
              </div>
            </div>
            <Textarea />
            <Separator className="my-8" />
          </>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-xl">환불 정책</div>
        <div>환불 정책 내용~~</div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="text-xl">기본 규칙</div>
        <div>기본 규칙 내용~~</div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-row items-center gap-2">
        <ClockIcon className="size-5" />
        <span>
          가이드가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직 확정된
          것이 아닙니다. 예약 확정 전까지는 요금이 청구되지 않습니다.
        </span>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="text-sm text-muted-foreground">
          아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 게스트에게
          적용되는 기본 규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에
          대한 책임이 본인에게 있을 경우 에어비앤비가 결제 수단으로 청구의
          조치를 취할 수 있다는 사실에 동의하는 것입니다. 호스트가 예약 요청을
          수락하면 표시된 총액이 결제되는 데 동의합니다.
        </div>
        <Button className="w-fit">예약 요청</Button>
      </div>
    </>
  );
}
