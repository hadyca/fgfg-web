import { useTranslations } from "next-intl";

export const metadata = {
  title: "개인 정보 취급 방침",
  description:
    "FGFG 서비스의 개인 정보 보호 및 처리 방침을 확인하세요. 사용자의 개인 정보를 안전하게 보호하며, 수집, 이용, 저장, 공유 방식에 대해 투명하게 안내드립니다.",
};

export default function PrivacyPolicy() {
  const t = useTranslations();
  return (
    <div className="max-w-4xl mx-auto my-10 px-6">
      <div className="text-center font-bold text-3xl mb-6">
        {t("PrivacyPolicy.privacyPolicy")}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.normal")}
          </h2>
          <p>{t("PrivacyPolicy.normalDescription")}</p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.collectedInformation")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("PrivacyPolicy.collectedInformationDescription")}</p>
            </li>
            <li>
              <p>{t("PrivacyPolicy.collectedInformationDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.purposeOfCollection")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("PrivacyPolicy.purposeOfCollectionDescription")}</p>
            </li>
            <li>
              <p>{t("PrivacyPolicy.purposeOfCollectionDescription2")}</p>
            </li>
            <li>
              <p>{t("PrivacyPolicy.purposeOfCollectionDescription3")}</p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.personalInformationProcessing")}
          </h2>
          <p>{t("PrivacyPolicy.personalInformationProcessingDescription")}</p>
          <p>{t("PrivacyPolicy.personalInformationProcessingDescription2")}</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.division")}
                  </th>
                  <th className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.subcontractor")}
                  </th>
                  <th className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.delegatedTasks")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.contentProvision")}
                  </td>
                  <td className="px-4 py-2 border-b">Cloudflare</td>
                  <td className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.contentProvisionDescription")}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.serverProvision")}
                  </td>
                  <td className="px-4 py-2 border-b">Amazon</td>
                  <td className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.serverProvisionDescription")}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.paymentProcessing")}
                  </td>
                  <td className="px-4 py-2 border-b">Iamport</td>
                  <td className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.paymentProcessingDescription")}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.notificationSending")}
                  </td>
                  <td className="px-4 py-2 border-b">Mailchimp</td>
                  <td className="px-4 py-2 border-b">
                    {t("PrivacyPolicy.notificationSendingDescription")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.thirdPartyDisclosure")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("PrivacyPolicy.thirdPartyDisclosureDescription")}</p>
            </li>
            <li>
              <p>{t("PrivacyPolicy.thirdPartyDisclosureDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.personalInformationRetention")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                {t("PrivacyPolicy.personalInformationRetentionDescription")}
              </p>
            </li>
            <li>
              <p>
                {t("PrivacyPolicy.personalInformationRetentionDescription2")}
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.personalInformationDisposal")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("PrivacyPolicy.personalInformationDisposalDescription")}</p>
            </li>
            <li>
              <p>
                {t("PrivacyPolicy.personalInformationDisposalDescription2")}
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.userRightsAndMethods")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("PrivacyPolicy.userRightsAndMethodsDescription")}</p>
            </li>
            <li>
              <p>{t("PrivacyPolicy.userRightsAndMethodsDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.technicalAndManagementMeasures")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                {t("PrivacyPolicy.technicalAndManagementMeasuresDescription")}
              </p>
            </li>
            <li>
              <p>
                {t("PrivacyPolicy.technicalAndManagementMeasuresDescription2")}
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.amendmentOfPrivacyPolicy")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("PrivacyPolicy.amendmentOfPrivacyPolicyDescription")}</p>
            </li>
            <li>
              <p>{t("PrivacyPolicy.amendmentOfPrivacyPolicyDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("PrivacyPolicy.contact")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("PrivacyPolicy.contactDescription")}</p>
            </li>
          </ol>
        </div>
        <div className="text-center text-sm text-gray-500">
          {t("PrivacyPolicy.lastModified")}
        </div>
      </div>
    </div>
  );
}
