import Image from "next/image";
import bg from "../../../../public/bg.png";
import Cta from "../CtaForm";
export default function Hero() {
  return (
    <div className="mt-[76px] flex flex-col items-center justify-end overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="relative min-h-[85vh] flex flex-col justify-center items-center text-center w-full px-5 sm:px-8 lg:px-12">
        {/* Enhanced gradient background with subtle artistic elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full max-w-6xl left-1/2 -translate-x-1/2 top-0 rounded-b-[3rem] bg-gradient-to-b from-gray-100/40 via-gray-50/20 to-transparent h-[60%] lg:h-[65%]"></div>
          {/* Subtle decorative circles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gray-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-gray-300/15 rounded-full blur-3xl"></div>
        </div>

        {/* Main content with improved typography hierarchy */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 sm:space-y-10 pt-16 sm:pt-20 lg:pt-24">
          {/* Decorative accent line */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
          </div>

          {/* Main heading with refined typography */}
          <h1 className="flex flex-col justify-center items-center font-cardo text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 w-full leading-[1.1] tracking-tight">
            <span className="block mb-2 text-gray-900">
              Symfonia
            </span>
            <span className="block text-gray-900">kolorów</span>
          </h1>

          {/* Subtitle with improved styling */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-ubuntu font-light leading-relaxed max-w-2xl mx-auto px-4">
            Obrazy na płótnie – unikalne, wyraziste, stworzone z pasją.
          </p>

          {/* CTA button with enhanced styling */}
          <div className="pt-4 sm:pt-6">
            <Cta label="Zamów obraz" />
          </div>

          {/* Decorative element below CTA */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          </div>
        </div>

        {/* Enhanced image carousel section */}
        <div className="w-full mt-16 sm:mt-20 lg:mt-24 overflow-hidden relative">
          <div className="absolute inset-0 bg-white/50 z-10 pointer-events-none"></div>
          <div className="flex w-max items-start ml-[100%] relative z-0">
            <Image
              src={bg}
              alt="Obrazy na sprzedaż"
              className="w-full h-full move-from-right-to-left opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
