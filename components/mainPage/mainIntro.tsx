import {
  SparklesIcon,
  PaperAirplaneIcon,
  GlobeAsiaAustraliaIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function MainIntro() {
  const t = useTranslations();
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {t("main.serviceIntroduction")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <GlobeAsiaAustraliaIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">{t("main.localGirlfriend")}</h3>
          <p className="mt-2 text-pink-500">
            {t("main.localGirlfriendDescription")}
          </p>
        </div>
        <div className="text-center">
          <SparklesIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">
            {t("main.experienceLocalCulture")}
          </h3>
          <p className="mt-2 text-pink-500">
            {t("main.experienceLocalCultureDescription")}
          </p>
        </div>
        <div className="text-center">
          <ChatBubbleLeftRightIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">
            {t("main.customGuideService")}
          </h3>
          <p className="mt-2 text-pink-500">
            {t("main.customGuideServiceDescription")}
          </p>
        </div>
        <div className="text-center">
          <PaperAirplaneIcon className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-semibold">
            {t("main.easyReservationProcess")}
          </h3>
          <p className="mt-2 text-pink-500">
            {t("main.easyReservationProcessDescription")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-8">
        <div className="col-span-2 flex flex-col justify-center">
          <p className="text-2xl md:text-3xl font-semibold mb-4">
            {t("main.specialDayWithLocalGirlfriend")}
          </p>
          <p className="text-lg md:text-xl text-pink-500">
            {t("main.specialDayWithLocalGirlfriendDescription")}
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
            {t("main.internationalCouple")}
          </p>
          <p className="text-lg md:text-xl text-pink-500">
            {t("main.internationalCoupleDescription")}
          </p>
        </div>
      </div>
      <div className="mt-10">{t("main.betaTestDescription")}</div>
    </section>
  );
}
