"use client";

import { ImageWithSkeleton } from "./ImageLoadingSkeleton";

export default function ProductImages({
  product,
  setCurrentIndex,
  setImageOpen,
}: {
  product: any;
  setCurrentIndex: any;
  setImageOpen: any;
}) {
  return (
    <div className="mt-10 mb-6 overflow-hidden">
      <div 
        className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 mt-6"
        style={{ columnGap: '0.75rem' }}
      >
        {product.images.map((image: any, i: any) => (
          <div key={i} className="break-inside-avoid mb-3 w-full">
            <ImageWithSkeleton
              src={image.src}
              index={i}
              setCurrentIndex={setCurrentIndex}
              setImageOpen={setImageOpen}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
