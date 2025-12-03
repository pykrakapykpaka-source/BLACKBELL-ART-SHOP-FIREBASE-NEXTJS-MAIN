import Image from "next/image";
import { getPolishCurrency } from "../../../../utils/getPolishCurrency";
import { updateDocument } from "@/firebase";
import { useState } from "react";
import Link from "next/link";
import { getProductUrl } from "@/utils/getProductUrl";

export default function ProductCard({
  product,
}: {
  product: any;
}) {
  const [loading, setLoading] = useState(true);
  return (
    <Link
      href={getProductUrl(product)}
      className="group relative cursor-pointer p-2 sm:p-3 block w-full overflow-hidden"
      onClick={() => {
        updateDocument(
          ["views"],
          [product?.views ? product?.views + 1 : 1],
          "products",
          product.id
        );
      }}
    >
      {!loading && (
        <>
          <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/60 via-black/30 to-black/10 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-300 rounded-lg" />
          <div className="absolute z-[6] inset-0 flex items-center justify-center p-2 sm:p-4">
            <div className="text-center w-full px-1 sm:px-3">
            {product.price > 0 && (
              <p className="group-hover:scale-110 scale-100 sm:scale-125 transition-transform duration-300 font-cardo text-white font-bold text-xs sm:text-sm mb-1 drop-shadow-lg break-words">
                {getPolishCurrency(product.price)}
              </p>
            )}
            {product.price === 0 && (
              <p className="text-white font-bold text-xs sm:text-sm mb-1 drop-shadow-lg font-ubuntu break-words">
                Zapytaj o cenę
              </p>
            )}
            {product?.sold && (
              <p className="text-red-500 font-bold text-xs sm:text-sm mb-1 drop-shadow-lg break-words">Sprzedany</p>
            )}
            <h2 className="font-cardo text-white font-bold text-xs sm:text-base lg:text-lg line-clamp-2 drop-shadow-lg break-words">
              {product.title}
            </h2>
            </div>
          </div>
        </>
      )}

      <div className="relative w-full overflow-hidden rounded-lg">
        {loading && (
          <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-200 animate-pulse rounded-lg">
            <Image
              width={800}
              height={800}
              src={product.mainImage || product.images[0]?.src}
              alt={product.title}
              onLoad={() => setLoading(false)}
              className={`${
                !loading ? "opacity-100" : "opacity-0"
              } shadow-sm shadow-black rounded-lg w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 max-w-full`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
        {!loading && (
          <Image
            width={800}
            height={800}
            src={product.mainImage || product.images[0]?.src}
            alt={product.title}
            onLoad={() => {
              setTimeout(() => {
                setLoading(false);
              }, 3000);
            }}
            className={`${
              !loading ? "opacity-100" : "opacity-0"
            } shadow-lg shadow-zinc-500 rounded-lg w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 max-w-full`}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </div>
    </Link>
  );
}
