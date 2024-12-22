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
        {t("privacyPolicy.privacyPolicy")}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.normal")}
          </h2>
          <p>{t("privacyPolicy.normalDescription")}</p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.collectedInformation")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("privacyPolicy.collectedInformationDescription")}</p>
            </li>
            <li>
              <p>{t("privacyPolicy.collectedInformationDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.purposeOfCollection")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("privacyPolicy.purposeOfCollectionDescription")}</p>
            </li>
            <li>
              <p>{t("privacyPolicy.purposeOfCollectionDescription2")}</p>
            </li>
            <li>
              <p>{t("privacyPolicy.purposeOfCollectionDescription3")}</p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.personalInformationProcessing")}
          </h2>
          <p>{t("privacyPolicy.personalInformationProcessingDescription")}</p>
          <p>{t("privacyPolicy.personalInformationProcessingDescription2")}</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">
                    {t("privacyPolicy.division")}
                  </th>
                  <th className="px-4 py-2 border-b">
                    {t("privacyPolicy.subcontractor")}
                  </th>
                  <th className="px-4 py-2 border-b">
                    {t("privacyPolicy.delegatedTasks")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {t("privacyPolicy.contentProvision")}
                  </td>
                  <td className="px-4 py-2 border-b">Cloudflare</td>
                  <td className="px-4 py-2 border-b">
                    {t("privacyPolicy.contentProvisionDescription")}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {t("privacyPolicy.serverProvision")}
                  </td>
                  <td className="px-4 py-2 border-b">Amazon</td>
                  <td className="px-4 py-2 border-b">
                    {t("privacyPolicy.serverProvisionDescription")}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {t("privacyPolicy.paymentProcessing")}
                  </td>
                  <td className="px-4 py-2 border-b">Iamport</td>
                  <td className="px-4 py-2 border-b">
                    {t("privacyPolicy.paymentProcessingDescription")}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">
                    {t("privacyPolicy.notificationSending")}
                  </td>
                  <td className="px-4 py-2 border-b">Mailchimp</td>
                  <td className="px-4 py-2 border-b">
                    {t("privacyPolicy.notificationSendingDescription")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.thirdPartyDisclosure")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("privacyPolicy.thirdPartyDisclosureDescription")}</p>
            </li>
            <li>
              <p>{t("privacyPolicy.thirdPartyDisclosureDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.personalInformationRetention")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                {t("privacyPolicy.personalInformationRetentionDescription")}
              </p>
            </li>
            <li>
              <p>
                {t("privacyPolicy.personalInformationRetentionDescription2")}
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.personalInformationDisposal")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("privacyPolicy.personalInformationDisposalDescription")}</p>
            </li>
            <li>
              <p>
                {t("privacyPolicy.personalInformationDisposalDescription2")}
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.userRightsAndMethods")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("privacyPolicy.userRightsAndMethodsDescription")}</p>
            </li>
            <li>
              <p>{t("privacyPolicy.userRightsAndMethodsDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.technicalAndManagementMeasures")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                {t("privacyPolicy.technicalAndManagementMeasuresDescription")}
              </p>
            </li>
            <li>
              <p>
                {t("privacyPolicy.technicalAndManagementMeasuresDescription2")}
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.amendmentOfPrivacyPolicy")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("privacyPolicy.amendmentOfPrivacyPolicyDescription")}</p>
            </li>
            <li>
              <p>{t("privacyPolicy.amendmentOfPrivacyPolicyDescription2")}</p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            {t("privacyPolicy.contact")}
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>{t("privacyPolicy.contactDescription")}</p>
            </li>
          </ol>
        </div>
        <div className="text-center text-sm text-gray-500">
          {t("privacyPolicy.lastModified")}
        </div>
      </div>
    </div>
  );
}
