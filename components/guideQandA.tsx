import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useTranslations } from "next-intl";

export default function GuideQandA() {
  const t = useTranslations();
  return (
    <>
      <div className="flex flex-row items-center gap-1">
        <QuestionMarkCircleIcon className="size-6" />
        <span className="text-lg font-semibold">
          {t("signUpGuide.guideQandA")}
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-7">
          <AccordionTrigger>{t("signUpGuide.guideQandA1")}</AccordionTrigger>
          <AccordionContent>
            <p>{t("signUpGuide.guideQandA1Answer1")}</p>
            <p>{t("signUpGuide.guideQandA1Answer2")}</p>
            <p>{t("signUpGuide.guideQandA1Answer3")}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>{t("signUpGuide.guideQandA2")}</AccordionTrigger>
          <AccordionContent>
            {t("signUpGuide.guideQandA2Answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger>{t("signUpGuide.guideQandA3")}</AccordionTrigger>
          <AccordionContent>
            {t("signUpGuide.guideQandA3Answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>{t("signUpGuide.guideQandA4")}</AccordionTrigger>
          <AccordionContent>
            <p>{t("signUpGuide.guideQandA4Answer")}</p>
            <p>{t("signUpGuide.guideQandA4Answer2")}</p>
            <p>{t("signUpGuide.guideQandA4Answer3")}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t("signUpGuide.guideQandA5")}</AccordionTrigger>
          <AccordionContent>
            {t("signUpGuide.guideQandA5Answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{t("signUpGuide.guideQandA6")}</AccordionTrigger>
          <AccordionContent>
            {t("signUpGuide.guideQandA6Answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>{t("signUpGuide.guideQandA8")}</AccordionTrigger>
          <AccordionContent>
            {t("signUpGuide.guideQandA8Answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>{t("signUpGuide.guideQandA9")}</AccordionTrigger>
          <AccordionContent>
            {t("signUpGuide.guideQandA9Answer")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>{t("signUpGuide.guideQandA10")}</AccordionTrigger>
          <AccordionContent>
            {t("signUpGuide.guideQandA10Answer")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
