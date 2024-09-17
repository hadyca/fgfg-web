import Footer from "@/components/mainPage/footer";
import HeroSection from "@/components/mainPage/heroSection";
import HeroSectionForm from "@/components/mainPage/heroSectionForm";
import HowItWorksSection from "@/components/mainPage/howItWorksSection";

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      <section
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6665776/pexels-photo-6665776.jpeg?auto=compress&cs=tinysrgb&w=1920&h=750&dpr=1')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center flex flex-col gap-4 items-center">
          <h1 className="text-xl md:text-5xl font-bold text-muted text-center my-4 md:mt-20">
            베트남 여자친구와 짜릿한 호치민 여행을 떠나보세요!
          </h1>
          <HeroSectionForm />
        </div>
      </section>
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
