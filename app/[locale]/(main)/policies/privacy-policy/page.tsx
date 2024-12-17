export const metadata = {
  title: "개인 정보 취급 방침",
  description:
    "FGFG 서비스의 개인 정보 보호 및 처리 방침을 확인하세요. 사용자의 개인 정보를 안전하게 보호하며, 수집, 이용, 저장, 공유 방식에 대해 투명하게 안내드립니다.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto my-10 px-6">
      <div className="text-center font-bold text-3xl mb-6">
        개인 정보 취급 방침
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="font-bold text-xl mb-2">1. 총칙</h2>
          <p>
            fgfg(이하 &quot;서비스&quot;)는 사용자의 개인정보를 중요하게
            생각하며, 개인정보 보호법을 준수합니다. 본 개인 정보 취급 방침은
            fgfg가 제공하는 서비스 이용 시 수집된 개인정보의 이용 및 보호에 대한
            내용을 설명합니다.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">2. 수집하는 개인정보 항목</h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                서비스 이용 시 필수로 수집되는 개인정보: 이름, 이메일, 전화번호,
                결제 정보 등
              </p>
            </li>
            <li>
              <p>
                서비스 이용 과정에서 자동으로 수집되는 정보: IP 주소, 쿠키, 접속
                로그 등
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">3. 개인정보 수집 목적</h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                서비스 제공 및 운영: 사용자의 예약 처리, 고객 지원, 결제 및 환불
                처리 등
              </p>
            </li>
            <li>
              <p>
                서비스 품질 향상: 서비스 개선 및 사용자 피드백을 통한 맞춤형
                서비스 제공
              </p>
            </li>
            <li>
              <p>
                법적 의무 준수: 관련 법률에 따른 의무 이행 및 법적 분쟁 해결
              </p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">4. 개인정보 처리 위탁 현황</h2>
          <p>
            서비스는 원활한 서비스 제공과 효율적인 업무처리를 위하여 다음과 같이
            개인정보를 처리 위탁하고 있습니다.
          </p>
          <p>
            서비스는 수탁자들이 위탁한 개인정보를 안전하게 처리하고 있는지
            지속적으로 관리 감독하고 있으며, 수탁업무가 종료된 때에는 수탁자가
            보유하고 있는 개인정보는 즉시 파기하게 하고 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">구분</th>
                  <th className="px-4 py-2 border-b">수탁자</th>
                  <th className="px-4 py-2 border-b">위탁업무</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">콘텐츠 제공</td>
                  <td className="px-4 py-2 border-b">Cloudflare</td>
                  <td className="px-4 py-2 border-b">
                    가이드 사진 등의 콘텐츠 제공을 위한 인프라
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">서버 제공</td>
                  <td className="px-4 py-2 border-b">아마존 웹서비스</td>
                  <td className="px-4 py-2 border-b">
                    서비스 운영을 위한 인프라
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">결제 처리</td>
                  <td className="px-4 py-2 border-b">Stripe</td>
                  <td className="px-4 py-2 border-b">
                    신용카드를 통한 결제 처리
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">알림 발송</td>
                  <td className="px-4 py-2 border-b">Mailchimp</td>
                  <td className="px-4 py-2 border-b">메시지 발송</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">5. 개인정보의 제3자 제공</h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                사용자의 동의 없이 제3자에게 개인정보를 제공하지 않습니다. 다만,
                법적 의무가 있는 경우나 사용자의 동의가 있을 때 예외가
                적용됩니다.
              </p>
            </li>
            <li>
              <p>
                제3자 제공 시 제공되는 정보와 목적, 제공받는 자에 대해 사전에
                고지하고 동의를 받습니다.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            6. 개인정보 보유 및 이용 기간
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                사용자의 개인정보는 수집 및 이용 목적이 달성된 후에는 즉시
                파기합니다.
              </p>
            </li>
            <li>
              <p>
                다만, 법령에 의해 보관이 필요한 경우 해당 기간 동안 안전하게
                보관합니다.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            7. 개인정보 파기 절차 및 방법
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                개인정보는 수집 목적 달성 후 별도의 데이터베이스로 옮겨지며,
                내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후
                파기됩니다.
              </p>
            </li>
            <li>
              <p>
                전자적 파일 형태의 정보는 복구할 수 없는 기술적 방법을 사용하여
                삭제합니다.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            8. 이용자 및 법정 대리인의 권리와 그 행사 방법
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                사용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
                삭제를 요청할 수 있습니다.
              </p>
            </li>
            <li>
              <p>
                법정 대리인은 만 14세 미만 아동의 개인정보에 대해 조회, 수정,
                삭제를 요청할 수 있습니다.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            9. 개인정보 보호를 위한 기술적/관리적 대책
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                개인정보는 비밀번호에 의해 보호되며, 중요한 데이터는 암호화하여
                보관합니다.
              </p>
            </li>
            <li>
              <p>
                개인정보 접근 권한을 최소화하고, 관련 직원에게 정기적인 보안
                교육을 실시합니다.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">
            10. 개인정보 취급 방침의 변경
          </h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                개인정보 취급 방침이 변경될 경우 변경 사항은 fgfg 공식 사이트에
                공지됩니다.
              </p>
            </li>
            <li>
              <p>
                변경된 방침은 공지 후 7일간 효력이 발생하며, 중요한 내용 변경은
                최소 30일 전에 공지합니다.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2">11. 문의</h2>
          <ol className="list-decimal pl-6">
            <li>
              <p>
                개인정보 취급 방침에 대한 문의 사항이 있으시면 아래 이메일로
                연락해 주시기 바랍니다.
              </p>
            </li>
            <li>
              <p className="font-medium">이메일: hadycas@gmail.com</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
