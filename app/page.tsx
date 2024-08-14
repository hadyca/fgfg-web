import HeaderSection from "@/components/headerSection";
import HeroSection from "@/components/heroSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      <HeaderSection />
      <HeroSection />
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-8 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          How It Works
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Step 1"
              width={100}
              height={100}
              className="mx-auto rounded-3xl"
            />
            <h3 className="mt-4 text-xl font-semibold">Choose a Guide</h3>
            <p className="mt-2 text-gray-600">
              Browse through our list of friendly and experienced guides.
            </p>
          </div>
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt="Step 2"
              width={100}
              height={100}
              className="mx-auto rounded-full"
            />
            <h3 className="mt-4 text-xl font-semibold">Book Your Experience</h3>
            <p className="mt-2 text-gray-600">
              Select a date and time that works best for you.
            </p>
          </div>
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1510074377623-8cf13fb90f61"
              alt="Step 3"
              width={100}
              height={100}
              className="mx-auto rounded-full"
            />
            <h3 className="mt-4 text-xl font-semibold">Enjoy Your Day</h3>
            <p className="mt-2 text-gray-600">
              Explore the city and create memories with your personal guide.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-100 py-16 px-8 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          What Our Users Say
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-700">
              "I had an amazing time exploring the city with my guide! She
              showed me places I would have never found on my own."
            </p>
            <div className="mt-4 flex items-center">
              <Image
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
                alt="User 1"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-4 text-gray-800 font-semibold">
                Emily, USA
              </span>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-700">
              "A unique and personal experience that made my trip unforgettable.
              Highly recommend!"
            </p>
            <div className="mt-4 flex items-center">
              <Image
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                alt="User 2"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-4 text-gray-800 font-semibold">
                Anna, Germany
              </span>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-700">
              "The guide was so friendly and knowledgeable. I felt like I was
              hanging out with a friend all day."
            </p>
            <div className="mt-4 flex items-center">
              <Image
                src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df"
                alt="User 3"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-4 text-gray-800 font-semibold">
                Sophia, UK
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-teal-600 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            &copy; 2024 Your Company Name. All rights reserved.
          </p>
          <p className="text-sm mt-2">Terms of Service | Privacy Policy</p>
        </div>
      </footer>
    </main>
  );
}
