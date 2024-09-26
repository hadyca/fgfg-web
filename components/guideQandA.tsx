import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function GuideQandA() {
  return (
    <>
      <div className="flex flex-row items-center gap-1">
        <QuestionMarkCircleIcon className="size-6" />
        <span className="text-lg font-semibold">자주 묻는 질문</span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-7">
          <AccordionTrigger>Q. 무슨 가이드를 하는 거에요?</AccordionTrigger>
          <AccordionContent>
            주 고객인 외국인을 대상으로, 마치 진짜 여자친구처럼 편안하고
            친근하게 동행해주는 가이드 역할을 하게 됩니다. <br />
            고객과 함께 여행지나 명소를 방문하고, 일상적인 대화를 나누며
            고객들이 베트남 문화를 더 깊이 체험할 수 있도록 돕습니다. 고객이
            베트남에서 특별한 경험을 할 수 있도록, 때로는 로컬 맛집을
            소개하거나, 나만 아는 장소를 소개해주는 등 다양한 활동을 함께하게
            됩니다.
            <br />
            고객에게는 단순한 여행 가이드를 넘어서, 진정한 베트남의 일상을
            공유하는 특별한 여자친구가 되어주는 역할을 합니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>
            Q. 외국어를 잘 못하는데, 괜찮을까요?
          </AccordionTrigger>
          <AccordionContent>
            괜찮습니다. 외국어 능력은 필수 사항이 아닙니다. 마음 편히
            지원해주세요.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger>Q. 면접을 봐야 하나요?</AccordionTrigger>
          <AccordionContent>
            네 그렇습니다. 면접을 통해 가이드 활동 시 주의사항과 급여에 대해
            안내해 드립니다. 양식 제출 후 24시간 이내에, 가입하신 이메일 주소로
            면접 장소와 시간을 알려드립니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>Q. 한달에 얼마 정도 벌 수 있어요?</AccordionTrigger>
          <AccordionContent>
            2024년 호치민 최저 시급은 약 23.800 VND 입니다. 주말 휴일 아르바이트
            여성의 노동 시간을 160시간(20일 X 8시간)이라고 가정 했을 때, 월
            수입은 약 3.800.000 VND 입니다. <br />
            <br />
            FGFG 가이드로 일할 경우, 월에 약 20시간정도만 가이드를 하게 되면,
            3.800.000 VND의 월 수입이 예상 됩니다. <br />
            <br />그 외에도 다른 보수제도를 마련 중에 있습니다. 자세한 내용은
            면접시에 설명하므로, 우선은 지원해 주세요.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Q. 보통 가이드 시간은 얼마나 걸리나요?
          </AccordionTrigger>
          <AccordionContent>
            가이드 시간은 최소 2시간 이며, 평균 4시간 정도 예상됩니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Q. 성적인 서비스를 제공 해야 하나요?
          </AccordionTrigger>
          <AccordionContent>
            전혀 아닙니다. 만일, 고객으로부터 성적인 것을 강요받는 경우, 즉시
            가이드를 종료하고 돌아갈 수 있습니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Q. 가벼운 스킨쉽은 괜찮나요?</AccordionTrigger>
          <AccordionContent>
            손잡기, 팔짱 끼기 정도의 수준은 허용 됩니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>
            Q. 고객분들이 안전한 사람들일까요?
          </AccordionTrigger>
          <AccordionContent>
            고객분들께 사전에 방문을 피해야 할 장소와 가이드분들을 존중하는
            방법에 대해 안내드립니다. 가이드분들의 안전을 최우선으로
            고려하겠습니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            Q. 주 고객은 어느나라 사람들이 많아요?
          </AccordionTrigger>
          <AccordionContent>한국인이 주 고객분들입니다.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            Q. 가이드를 할 때 준비해야 할 것이 있나요?
          </AccordionTrigger>
          <AccordionContent>
            기본적인 준비물과 함께 고객님의 요청에 맞는 준비를 해주시면 됩니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
