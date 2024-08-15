export default function HeaderSection() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-2xl font-bold text-teal-600">
          <a href="#">FGFG</a>
        </div>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a
                href="#how-it-works"
                className="text-gray-800 hover:text-teal-600"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-gray-800 hover:text-teal-600"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-800 hover:text-teal-600">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
