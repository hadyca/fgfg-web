import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function GuideManual() {
  return (
    <>
      <div className="flex flex-row items-center mb-2">
        <Link href={"/guide-dashboard"}>
          <span className="text-primary text-lg">가이드 관리</span>
        </Link>
        <ChevronRightIcon className="w-5 h-5 mx-2" />
        <span className="text-lg">가이드 매뉴얼</span>
      </div>
      <div className="font-bold text-3xl mb-10">가이드 매뉴얼</div>
      <div className="flex flex-col gap-10">
        <div>
          <div className="font-bold text-lg mb-2">1. 고객님과 만나기 전</div>
          <div className="flex flex-col gap-2">
            <li>
              고객님이 예약 시 메시지를 보내니, 꼭 확인하고 대화를 통해 약속
              장소와 시간을 다시 한 번 확인해 주세요.
            </li>
            <li>
              가이드를 준비할 때, 미리 코스를 계획해 두시면 더욱 좋습니다.
            </li>
            <li>
              픽업시간에 절대 늦으시면 안됩니다. 픽업 시간 최소 10분전에는
              픽업장소에 도착해서 기다려주세요.
            </li>
            <li>
              픽업 시간에 늦을 것 같다면, 메시지로 예상 도착 시간을 알려주세요.
            </li>
            <li>
              만약, 예약 수락 이후 가이드를 진행하기 어려운 상황이라면 메시지를
              통해 고객님께 양해를 구하고, 환불 처리를 위해 운영자에게 연락
              부탁드립니다. 이메일을 보내실 때는, 취소 해야 하는 예약 번호를
              알려주세요.
              <Link
                href={"/guide-dashboard/reservations"}
                passHref
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary ml-2"
                >
                  예약 번호 확인하러 가기
                </a>
              </Link>
              <br />
              (운영자 email : hadycas@gmail.com )
            </li>
          </div>
        </div>
        <div>
          <div className="font-bold text-lg mb-2">
            2. 픽업 장소에서 고객님과 처음 만났을 때
          </div>
          <div className="flex flex-col gap-2">
            <li>
              환한 미소와 함께 인사를 나누고, 가이드 계획을 간단히 설명해
              주세요.
            </li>
            <li>
              약속 시간에 늦었다면, 진심으로 사과하고 늦은 시간 만큼 추가
              가이드를 원하시는지 물어보세요.
            </li>
          </div>
        </div>
        <div>
          <div className="font-bold text-lg mb-2">3. 가이드 진행</div>
          <div className="flex flex-col gap-2">
            <li>
              가벼운 손잡기나 팔짱끼기까지는 허용되지만, 자연스러운 타이밍에
              하는 것이 좋습니다.
            </li>
            <li>
              핸드폰을 자주 보면 고객님이 실망할 수 있으니, 고객님께 집중해
              주세요.
            </li>
            <li>
              식사 시, 고객님의 선호 음식을 먼저 물어보고 가능한 한 맞춰 주세요.
            </li>
            <li>
              숙박업체를 방문하는 것은 금지되어 있습니다. 만약 고객님이
              요청하신다면 정중하게 거절해 주세요.
            </li>
            <li>
              가이드 종료 10분전 쯤, 고객님께 가이드 시간 연장을 원하시는지
              물어봐주세요.
            </li>
            <li>
              고객님이 시간 연장을 원하실 경우, fgfg 공식 사이트에서 가이드님의
              예약 가능 시간을 확인한 뒤 예약 신청을 하고, 가이드님이 이를
              수락하시면 됩니다. (현재 시간 이전에는 예약이 불가능합니다.)
            </li>
            <li>
              fgfg 공식 사이트를 거치지 않고 추가 연장 시간에 대해 현금 결제를
              진행할 경우, fgfg와의 법적 문제가 발생할 수 있습니다.
            </li>
          </div>
        </div>
        <div>
          <div className="font-bold text-lg mb-2">4. 가이드 마무리</div>
          <div className="flex flex-col gap-2">
            <li>
              고객님이 만족할 수 있도록 마지막까지 친절하게 가이드를 마무리해
              주세요.
            </li>
            <li>
              감사 인사를 전하고, 즐거운 시간을 보내셨는지 간단히 여쭤보세요.
            </li>
          </div>
        </div>
        <div>최종 수정일: 2024년 10월 20일</div>
      </div>
    </>
  );
}
