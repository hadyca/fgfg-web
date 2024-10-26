import {
  SparklesIcon,
  PaperAirplaneIcon,
  GlobeAsiaAustraliaIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function MainIntro() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        FGFG 서비스 소개
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <GlobeAsiaAustraliaIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">
            현지 여자친구와의 특별한 하루
          </h3>
          <p className="mt-2 text-pink-500">
            베트남의 매력을 느낄 수 있는 일일 여자친구와 함께 특별한 하루를
            즐겨보세요.
          </p>
        </div>
        <div className="text-center">
          <SparklesIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">현지 문화 깊이 체험하기</h3>
          <p className="mt-2 text-pink-500">
            흔한 관광지가 아닌, 가이드가 추천하는 진짜 현지 문화를 경험해
            보세요.
          </p>
        </div>
        <div className="text-center">
          <ChatBubbleLeftRightIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">맞춤형 가이드 서비스</h3>
          <p className="mt-2 text-pink-500">
            예약 시간과 원하는 경험에 따라 가이드와 맞춤형 여행 일정을
            계획하세요.
          </p>
        </div>
        <div className="text-center">
          <PaperAirplaneIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">간편하고 쉬운 절차</h3>
          <p className="mt-2 text-pink-500">
            복잡한 절차 없이 간편하게 예약하고 쉽고 빠르게 만남을 시작하세요.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-8">
        <div className="col-span-2 flex flex-col justify-center">
          <p className="text-2xl md:text-3xl font-semibold mb-4">
            베트남 여자친구와의 하루를 경험해보세요.
          </p>
          <p className="text-lg md:text-xl text-pink-500">
            여자친구와 데이트하는 듯한 특별한 경험을 즐겨보세요. 가이드를 통해
            베트남 여성의 생각과 문화를 더욱 깊이 이해할 수 있습니다.
          </p>
        </div>
        <div>
          <div className="relative size-64 mx-auto rounded-md overflow-hidden">
            <Image
              fill
              src={
                "https://imagedelivery.net/dGGUSNmPRJm6ENhe7q2fhw/69ed51ec-a776-46bd-46a1-5e1d1e33c700/mainphoto"
              }
              alt={"guide main photo"}
              className="object-cover"
              sizes="256px 256px"
              priority
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-8">
        <div>
          <div className="relative size-64 mx-auto rounded-md overflow-hidden">
            <Image
              fill
              src={
                "https://imagedelivery.net/dGGUSNmPRJm6ENhe7q2fhw/684c2c63-e75b-45e9-8770-7d6cff5f8700/mainphoto"
              }
              alt={"guide main photo"}
              className="object-cover"
              sizes="256px 256px"
              priority
            />
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <p className="text-2xl md:text-3xl font-semibold mb-4">
            국제결혼에 관심 있으신가요?
          </p>
          <p className="text-lg md:text-xl text-pink-500">
            국제 결혼이 자신에게 맞는지 알아보려면, 무엇보다도 그 나라의 문화를
            이해하고 여러 차례 접해보는 것이 중요합니다. 부담 없는 가격과 원하는
            가이드 시간으로 손쉽게 경험해보세요.
          </p>
        </div>
      </div>
      <div className="mt-10">
        현재 베타 서비스를 제공하고 있습니다. 사용하시면서 불편한 점이나 개선할
        점이 있으시면 언제든지 hadycas@gmail.com으로 피드백을 보내주세요.
        여러분의 소중한 의견은 더 나은 서비스를 만드는 데 큰 도움이 됩니다. 많이
        참여해 주세요!
      </div>
    </section>
  );
}
