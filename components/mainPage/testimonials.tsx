import Image from "next/image";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-gray-100 py-16 px-8 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        What Our Users Say
      </h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <p className="text-gray-700">
            "I had an amazing time exploring the city with my guide! She showed
            me places I would have never found on my own."
          </p>
          <div className="mt-4 flex items-center">
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
              alt="User 1"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="ml-4 text-gray-800 font-semibold">Emily, USA</span>
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
            <span className="ml-4 text-gray-800 font-semibold">Sophia, UK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
