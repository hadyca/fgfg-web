import Footer from "@/components/mainPage/footer";
import HeroSectionForm from "@/components/mainPage/heroSectionForm";
import MainIntro from "@/components/mainPage/mainIntro";

export const metadata = {
  title: {
    absolute:
      "FGFG Foreign GirlFriend Guide - 당신만을 위한 최고의 외국 여친 가이드, 베트남에서 시작합니다.",
  },
};
export default function Home() {
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
            베트남 여자친구와 잊지 못할 호치민 여행을 떠나보세요!
          </h1>
          <HeroSectionForm />
        </div>
      </section>
      <MainIntro />
      <Footer />
    </main>
  );
}
