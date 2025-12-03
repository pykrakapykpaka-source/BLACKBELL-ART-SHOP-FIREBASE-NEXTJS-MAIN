export default function Orders() {
  return (
    <div className="mt-24 relative bg-[#d1d3d6] bg-form-orders bg-no-repeat bg-cover w-full h-max">
      <button name="orders" className="absolute -top-[66px] left-0"></button>
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 224 12"
          fill="currentColor"
          className="w-full -mb-1 text-gray-900"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center bg-white p-4 lg:p-8">
          <h4 className="font-cardo text-xl font-bold text-zinc-800 sm:text-4xl">
            Wspieraj Sztukę, Twórz Przyszłość
          </h4>
          <p className="mt-2 text-gray-600">
            Tworzenie to moja pasja i sposób na życie. Kupując moje prace, nie
            tylko zyskujesz coś wyjątkowego, ale też pomagasz mi dalej rozwijać
            się jako artysta.
          </p>
          <p className="mt-2 text-gray-600">
            Każde wsparcie to dla mnie motywacja, by tworzyć więcej i dzielić
            się swoją sztuką ze światem.
          </p>
          <p className="mt-2 text-gray-600">
            Dziękuję, że jesteś częścią tej podróży!
          </p>
        </div>
      </div>
    </div>
  );
}
