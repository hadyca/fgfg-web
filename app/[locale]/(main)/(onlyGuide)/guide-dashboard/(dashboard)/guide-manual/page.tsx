import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "가이드 매뉴얼",
  description:
    "FGFG 가이드를 위한 매뉴얼을 확인하세요. 서비스 제공 절차, 고객 응대 방법, 유의 사항 등 성공적인 가이드를 위한 정보를 제공합니다.",
};

export default async function GuideManual() {
  const t = await getTranslations();
  return (
    <>
      <div className="flex flex-row items-center mb-2">
        <Link href={"/guide-dashboard"}>
          <span className="text-primary text-lg">
            {t("guideManual.guideManagement")}
          </span>
        </Link>
        <ChevronRightIcon className="w-5 h-5 mx-2" />
        <span className="text-lg">{t("guideManual.guideManual")}</span>
      </div>
      <div className="font-bold text-3xl mb-10">
        {t("guideManual.guideManual")}
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <div className="font-bold text-lg mb-2">
            1. {t("guideManual.beforeMeeting")}
          </div>
          <div className="flex flex-col gap-2">
            <li>{t("guideManual.beforeMeetingDescription1")}</li>
            <li>{t("guideManual.beforeMeetingDescription2")}</li>
            <li>{t("guideManual.beforeMeetingDescription3")}</li>
            <li>{t("guideManual.beforeMeetingDescription4")}</li>

            <li>
              {t("guideManual.beforeMeetingDescription5")}
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
                  {t("guideManual.checkReservationNumber")}
                </a>
              </Link>
              <br />({t("guideManual.admin")} email : hadycas@gmail.com )
            </li>
          </div>
        </div>
        <div>
          <div className="font-bold text-lg mb-2">
            2. {t("guideManual.afterMeeting")}
          </div>
          <div className="flex flex-col gap-2">
            <li>{t("guideManual.afterMeetingDescription1")}</li>
            <li>{t("guideManual.afterMeetingDescription2")}</li>
          </div>
        </div>
        <div>
          <div className="font-bold text-lg mb-2">
            3. {t("guideManual.guideProgress")}
          </div>
          <div className="flex flex-col gap-2">
            <li>{t("guideManual.guideProgressDescription1")}</li>
            <li>{t("guideManual.guideProgressDescription2")}</li>
            <li>{t("guideManual.guideProgressDescription3")}</li>
            <li>{t("guideManual.guideProgressDescription4")}</li>
            <li>{t("guideManual.guideProgressDescription5")}</li>
            <li>{t("guideManual.guideProgressDescription6")}</li>
            <li>{t("guideManual.guideProgressDescription7")}</li>
          </div>
        </div>
        <div>
          <div className="font-bold text-lg mb-2">
            4. {t("guideManual.guideFinish")}
          </div>
          <div className="flex flex-col gap-2">
            <li>{t("guideManual.guideFinishDescription1")}</li>
            <li>{t("guideManual.guideFinishDescription2")}</li>
          </div>
        </div>
        <div>{t("guideManual.finalUpdate")}</div>
      </div>
    </>
  );
}
