import Image from "next/image";
import React, { useState } from "react";

export const LoadingSkeleton = () => {
  return <div className="aspect-square bg-gray-300 animate-pulse"></div>;
};

export function ImageWithSkeleton({
  src,
  index,
  setCurrentIndex,
  setImageOpen,
}: {
  src: string;
  index: number;
  setCurrentIndex: any;
  setImageOpen: any;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      onClick={() => {
        setCurrentIndex(index);
        setImageOpen(true);
      }}
      className="aspect-square cursor-pointer"
    >
      <div className="overflow-hidden">
        {loading && (
          <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px] bg-gray-200 animate-pulse">
            <Image
              width={800}
              height={800}
              src={src}
              alt="Obraz namalowany na płótnie"
              onLoad={() => setLoading(false)}
              className={`${
                !loading ? "opacity-100" : "opacity-0"
              } w-full h-full group-hover:scale-110 duration-1000 group-hover:rotate-3`}
            />
          </div>
        )}
        {!loading && (
          <Image
            width={800}
            height={800}
            src={src}
            alt="Obraz namalowany na płótnie"
            className={`${
              !loading ? "opacity-100" : "opacity-0"
            } w-full h-full group-hover:scale-110 duration-1000 group-hover:rotate-3`}
          />
        )}
      </div>
    </div>
  );
}
