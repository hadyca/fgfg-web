import Footer from "@/components/mainPage/footer";
import HeaderSection from "@/components/mainPage/headerSection";
import HeroSection from "@/components/mainPage/heroSection";
import HowItWorksSection from "@/components/mainPage/howItWorksSection";
import getUser from "@/lib/getUser";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="bg-white text-gray-800">
      <HeaderSection username={user?.data?.me?.username} />
      <HeroSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
