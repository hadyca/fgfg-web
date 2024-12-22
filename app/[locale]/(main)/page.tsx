import Footer from "@/components/mainPage/footer";
import HeroSectionForm from "@/components/mainPage/heroSectionForm";
import MainIntro from "@/components/mainPage/mainIntro";
import { useTranslations } from "next-intl";

export const metadata = {
  title: {
    absolute: "프지프지 FGFG - 베트남 여친 가이드",
  },
};
export default function Home() {
  const t = useTranslations("main");

  return (
    <main>
      <section
        className="relative h-[60vh] md:h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://imagedelivery.net/dGGUSNmPRJm6ENhe7q2fhw/ef610532-d87d-4b81-9339-3913a4c2c100/public')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center flex flex-col gap-4 items-center">
          <h1 className="text-xl px-3  font-bold text-white text-center my-4 md:text-5xl md:my-10 ">
            {t("title")}
          </h1>
          <HeroSectionForm />
        </div>
      </section>
      <MainIntro />
      <Footer />
    </main>
  );
}
