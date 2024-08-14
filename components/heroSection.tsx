export default function HeroSection() {
  {
    /* Hero Section */
  }
  <section
    className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/6665776/pexels-photo-6665776.jpeg?auto=compress&cs=tinysrgb&w=1920&h=750&dpr=1')",
    }}
  >
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white">
        외국인 여자친구 가이드와 함께 여행하세요
      </h1>
      <p className="mt-4 text-lg text-gray-200">
        친절한 외국인 가이드와 함께 로컬 문화와 숨겨진 보석을 경험해보세요
      </p>
      <button className="mt-8 px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full">
        Find Your Guide
      </button>
    </div>
  </section>;
}
