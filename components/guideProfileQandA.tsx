import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useTranslations } from "next-intl";

export default function GuideProfileQandA() {
  const t = useTranslations();
  return (
    <>
      <div className="flex flex-row items-center gap-1">
        <QuestionMarkCircleIcon className="size-6" />
        <span className="text-lg font-semibold">
          {t("createGuideProfile.guideQandA")}
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {t("createGuideProfile.guideQandA1")}
          </AccordionTrigger>
          <AccordionContent>
            {t("createGuideProfile.guideQandA1Answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            {t("createGuideProfile.guideQandA2")}
          </AccordionTrigger>
          <AccordionContent>
            {t("createGuideProfile.guideQandA2Answer")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
