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
        {t("termsAndConditions.termsAndConditions")}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("termsAndConditions.normal")}
          </h2>
          <p>{t("termsAndConditions.normalDescription")}</p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("termsAndConditions.service")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("termsAndConditions.serviceDescription")}</p>
            </li>
            <li>
              <p>{t("termsAndConditions.serviceDescription2")}</p>
            </li>
            <li>
              <p>{t("termsAndConditions.serviceDescription3")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("termsAndConditions.paymentAndRefundPolicy")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("termsAndConditions.paymentAndRefundPolicyDescription")}</p>
            </li>
            <li>
              <p>
                {t("termsAndConditions.paymentAndRefundPolicyDescription2")}
              </p>
            </li>
            <li>
              <p>
                {t("termsAndConditions.paymentAndRefundPolicyDescription3")}
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("termsAndConditions.guideAndUserDuty")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("termsAndConditions.guideAndUserDutyDescription")}</p>
            </li>
            <li>
              <p>{t("termsAndConditions.guideAndUserDutyDescription2")}</p>
            </li>
            <li>
              <p>{t("termsAndConditions.guideAndUserDutyDescription3")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("termsAndConditions.prohibitedActivities")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("termsAndConditions.prohibitedActivitiesDescription")}</p>
            </li>
            <li>
              <p>{t("termsAndConditions.prohibitedActivitiesDescription2")}</p>
            </li>
            <li>
              <p>{t("termsAndConditions.prohibitedActivitiesDescription3")}</p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("termsAndConditions.personalInformationProtection")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                {t(
                  "termsAndConditions.personalInformationProtectionDescription"
                )}
              </p>
            </li>
            <li>
              <p>
                {t(
                  "termsAndConditions.personalInformationProtectionDescription2"
                )}
              </p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("termsAndConditions.liabilityDisclaimer")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("termsAndConditions.liabilityDisclaimerDescription")}</p>
            </li>
            <li>
              <p>{t("termsAndConditions.liabilityDisclaimerDescription2")}</p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("termsAndConditions.amendmentOfTerms")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("termsAndConditions.amendmentOfTermsDescription")}</p>
            </li>
            <li>
              <p>{t("termsAndConditions.amendmentOfTermsDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("termsAndConditions.contact")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("termsAndConditions.contactDescription")}</p>
            </li>
          </ol>
        </div>
        <div className="text-center text-sm text-gray-500">
          {t("termsAndConditions.lastModified")}
        </div>
      </div>
    </div>
  );
}
