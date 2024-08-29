import Footer from "@/components/mainPage/footer";
import HeroSection from "@/components/mainPage/heroSection";
import HowItWorksSection from "@/components/mainPage/howItWorksSection";

export default async function Home() {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
