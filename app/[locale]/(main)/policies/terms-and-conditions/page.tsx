import { useTranslations } from "next-intl";

export const metadata = {
  title: "이용약관",
  description:
    "FGFG 서비스 이용약관을 확인하세요. 서비스 이용 시 필요한 규정과 조건을 안내드리며, 이용자와의 신뢰와 안전을 보장합니다.",
};

export default function TermsAndConditions() {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto my-10 px-6">
      <div className="text-center font-bold text-3xl mb-6">
        {t("TermsAndConditions.termsAndConditions")}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("TermsAndConditions.normal")}
          </h2>
          <p>{t("TermsAndConditions.normalDescription")}</p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("TermsAndConditions.service")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("TermsAndConditions.serviceDescription")}</p>
            </li>
            <li>
              <p>{t("TermsAndConditions.serviceDescription2")}</p>
            </li>
            <li>
              <p>{t("TermsAndConditions.serviceDescription3")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("TermsAndConditions.paymentAndRefundPolicy")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("TermsAndConditions.paymentAndRefundPolicyDescription")}</p>
            </li>
            <li>
              <p>
                {t("TermsAndConditions.paymentAndRefundPolicyDescription2")}
              </p>
            </li>
            <li>
              <p>
                {t("TermsAndConditions.paymentAndRefundPolicyDescription3")}
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("TermsAndConditions.guideAndUserDuty")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("TermsAndConditions.guideAndUserDutyDescription")}</p>
            </li>
            <li>
              <p>{t("TermsAndConditions.guideAndUserDutyDescription2")}</p>
            </li>
            <li>
              <p>{t("TermsAndConditions.guideAndUserDutyDescription3")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("TermsAndConditions.prohibitedActivities")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("TermsAndConditions.prohibitedActivitiesDescription")}</p>
            </li>
            <li>
              <p>{t("TermsAndConditions.prohibitedActivitiesDescription2")}</p>
            </li>
            <li>
              <p>{t("TermsAndConditions.prohibitedActivitiesDescription3")}</p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("TermsAndConditions.personalInformationProtection")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                {t(
                  "TermsAndConditions.personalInformationProtectionDescription"
                )}
              </p>
            </li>
            <li>
              <p>
                {t(
                  "TermsAndConditions.personalInformationProtectionDescription2"
                )}
              </p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("TermsAndConditions.liabilityDisclaimer")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("TermsAndConditions.liabilityDisclaimerDescription")}</p>
            </li>
            <li>
              <p>{t("TermsAndConditions.liabilityDisclaimerDescription2")}</p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("TermsAndConditions.amendmentOfTerms")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("TermsAndConditions.amendmentOfTermsDescription")}</p>
            </li>
            <li>
              <p>{t("TermsAndConditions.amendmentOfTermsDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("TermsAndConditions.contact")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("TermsAndConditions.contactDescription")}</p>
            </li>
          </ol>
        </div>
        <div className="text-center text-sm text-gray-500">
          {t("TermsAndConditions.lastModified")}
        </div>
      </div>
    </div>
  );
}
