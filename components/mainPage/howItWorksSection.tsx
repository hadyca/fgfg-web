import Image from "next/image";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 px-8 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        How It Works
      </h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <Image
            src="https://images.pexels.com/photos/6665776/pexels-photo-6665776.jpeg?auto=compress&cs=tinysrgb&w=1920&h=750&dpr=1"
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
            src="https://images.pexels.com/photos/6665776/pexels-photo-6665776.jpeg?auto=compress&cs=tinysrgb&w=1920&h=750&dpr=1"
            alt="Step 2"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h3 className="mt-4 text-xl font-semibold">Book Your Experience</h3>
          <p className="mt-2 text-gray-600">
            Select a date and time that works best for you.
          </p>
        </div>
        <div className="text-center">
          <Image
            src="https://images.pexels.com/photos/6665776/pexels-photo-6665776.jpeg?auto=compress&cs=tinysrgb&w=1920&h=750&dpr=1"
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
  );
}
