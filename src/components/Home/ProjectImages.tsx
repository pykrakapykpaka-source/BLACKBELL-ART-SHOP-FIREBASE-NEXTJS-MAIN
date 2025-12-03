"use client";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { set_modals } from "@/redux/slices/modalsopen";

export default function ProjectImages({
  service,
  currentIndex,
  setCurrentIndex,
  setImageOpen,
  isImageOpen,
}: {
  service: any;
  currentIndex: number;
  setCurrentIndex: Function;
  setImageOpen: Function;
  isImageOpen: boolean;
}) {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [side, setSide] = useState("");
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchEnd = () => {
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  function handleNext() {
    setCurrentIndex(
      currentIndex + 1 === service.images.length ? 0 : currentIndex + 1
    );
  }

  function handlePrev() {
    setCurrentIndex(
      currentIndex === 0 ? service.images.length - 1 : currentIndex - 1
    );
  }

  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();
  return (
    <div
      className={`fixed left-0 top-0 ${
        isImageOpen ? "block" : "hidden"
      } z-[9999]`}
    >
      <div
        onClick={() => {
          setImageOpen(false);
          dispatch(set_modals({ ...modals, isProjectOpen: false }));
        }}
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"
      >
        <div
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          className="fixed flex flex-col items-center justify-center top-1/2 -translate-y-1/2 mx-auto p-4"
        >
          <div className="flex justify-center relative group h-full items-center">
            {service.images.map((image: any, i: number) => (
              <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className={`w-full mx-auto bg-black/50 ${
                  i === 0 ? "top-16" : "left-0 top-0 absolute"
                } ${
                  currentIndex === i ? "opacity-100 duration-500" : `opacity-0`
                }
                }`}
                key={i}
              >
                <div className="relative h-[80vh] flex items-center justify-center">
                  <ProjectImage src={image.src} service={service} />
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                setImageOpen(false);
                dispatch(set_modals({ ...modals, isProjectOpen: false }));
              }}
              className="absolute -top-[90px] -right-12 text-white text-3xl z-50 p-12 hover:bg-gray-100/20 duration-300 ease-in rounded-full "
            >
              ✕
            </button>

            <div className="font-cardo text-lg w-max mx-auto absolute left-0 -top-8 bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd text-white">
              {currentIndex + 1} / {service.images.length}
            </div>

            <button
              onClick={() => handlePrev()}
              className="z-[101] duration-500 bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd hover:from-primaryHoverStart/80 hover:to-primaryHoverEnd/80 text-white text-lg p-3 absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 group-hover:opacity-100 opacity-0"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => handleNext()}
              className="z-[101] duration-500 bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd hover:from-primaryHoverStart/80 hover:to-primaryHoverEnd/80 text-white text-lg p-3 absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 group-hover:opacity-100 opacity-0"
            >
              <FaChevronRight />
            </button>
            {service.images && (
              <div className="z-50 w-full h-max absolute bottom-0 left-1/2 -translate-x-1/2 max-w-full overflow-x-auto whitespace-nowrap space-x-2 pt-2 group-hover:bg-black/50 opacity-0 group-hover:opacity-100 bg-transparent duration-500 px-3 scrollbar">
                {service.images.map((image: any, i: number) => (
                  <button
                    onClick={() => setCurrentIndex(i)}
                    key={i}
                    className={`relative h-[70px] w-auto border-2 ${
                      currentIndex === i ? "border-white" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image.src}
                      width={150}
                      height={150}
                      alt={"Obraz usługi"}
                      className="h-full w-auto"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectImage({ src, service }: { src: any; service: any }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg overflow-hidden">
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]"></div>
          
          {/* Pulse background circles for depth */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-700/30 rounded-full animate-pulse"></div>
          </div>
          
          {/* Spinner and text overlay */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-14 h-14 border-4 border-transparent border-r-gray-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="text-white/80 text-sm font-ubuntu font-medium tracking-wide">Ładowanie obrazu...</p>
          </div>
        </div>
      )}
      <Image
        src={src}
        width={1024}
        height={1024}
        alt={`Obraz na płótnie ${service?.title}`}
        onLoad={() => setLoading(false)}
        className={`w-auto max-h-full mx-auto aspect-auto transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        draggable="false"
      />
    </div>
  );
}
