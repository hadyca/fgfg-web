import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function GuideProfileQandA() {
  return (
    <>
      <div className="flex flex-row items-center gap-1">
        <QuestionMarkCircleIcon className="size-6" />
        <span className="text-lg font-semibold">자주 묻는 질문</span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Q. 꼭 사진이 필요 한가요?</AccordionTrigger>
          <AccordionContent>
            고객님들께서는, 가이드분의 사진과 간단한 소개를 원하십니다. 이해
            부탁 드립니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Q. 일정 기간 활동을 정지 하고 싶어요.
          </AccordionTrigger>
          <AccordionContent>
            가이드 관리 페이지에서 활동 정지를 활성화 하시게 되면, 가이드 조회
            시 노출되지 않습니다. 나중에 다시 활성화 하시면 됩니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
