import {
  UserCircleIcon,
  SparklesIcon,
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  GlobeAsiaAustraliaIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function MainIntro() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-8 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="text-center">
          <GlobeAsiaAustraliaIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">
            현지 여자친구와의 특별한 하루
          </h3>
          <p className="mt-2 text-gray-600">
            베트남의 매력을 느낄 수 있는 일일 여자친구와 함께 특별한 하루를
            즐겨보세요.
          </p>
        </div>
        <div className="text-center">
          <SparklesIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">현지 문화 깊이 체험하기</h3>
          <p className="mt-2 text-gray-600">
            흔한 관광지가 아닌, 가이드가 추천하는 진짜 현지 문화를 경험해
            보세요.
          </p>
        </div>
        <div className="text-center">
          <ChatBubbleLeftRightIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">맞춤형 가이드 서비스</h3>
          <p className="mt-2 text-gray-600">
            예약 시간과 원하는 경험에 따라 가이드와 맞춤형 여행 일정을
            계획하세요.
          </p>
        </div>
        <div className="text-center">
          <PaperAirplaneIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">간편하고 쉬운 절차</h3>
          <p className="mt-2 text-gray-600">
            복잡한 절차 없이 간편하게 예약하고 쉽고 빠르게 만남을 시작하세요.
          </p>
        </div>
      </div>
    </section>
  );
}
