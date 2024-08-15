import Footer from "@/components/mainPage/footer";
import HeaderSection from "@/components/mainPage/headerSection";
import HeroSection from "@/components/mainPage/heroSection";
import HowItWorksSection from "@/components/mainPage/howItWorksSection";
import Testimonials from "@/components/mainPage/testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      <HeaderSection />
      <HeroSection />
      <HowItWorksSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
