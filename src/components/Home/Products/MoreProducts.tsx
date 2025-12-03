"use client";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { getPolishCurrency } from "../../../../utils/getPolishCurrency";
import { updateDocument } from "@/firebase";
import Link from "next/link";
import { getProductUrl } from "@/utils/getProductUrl";

export default function MoreProducts({
  product,
  products,
}: {
  product: any;
  products: any;
}) {
  // Filter products deterministically (same on server and client)
  const filteredProducts = useMemo(() => {
    return [...products].filter((item: any) => item.id !== product.id);
  }, [products, product.id]);

  // Get deterministic initial products (same order on server and client)
  const initialProducts = useMemo(() => {
    return filteredProducts.slice(0, 10);
  }, [filteredProducts]);

  // Shuffle only on client side after hydration to avoid SSR mismatch
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts);

  useEffect(() => {
    // After hydration, shuffle on client side only
    const shuffled = [...filteredProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setDisplayedProducts(shuffled);
  }, [filteredProducts]);

  return (
    <div className="pb-6 overflow-hidden">
      <h3 className="mb-6 mt-12 text-gray-900 text-xl sm:text-2xl xl:text-3xl text-center lg:text-left font-cardo font-bold flex flex-row items-center">
        Zobacz więcej
      </h3>
      <div 
        className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4"
        style={{ columnGap: '0.75rem' }}
      >
        {displayedProducts?.map((item: any, i: any) => (
          <div key={item.id || item.title} className="break-inside-avoid mb-3 w-full">
            <Link
              href={getProductUrl(item)}
              onClick={() => {
                updateDocument(
                  ["views"],
                  [item?.views ? item?.views + 1 : 1],
                  "products",
                  item.id
                );
              }}
              className="block relative overflow-hidden group rounded-lg w-full"
            >
              <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/60 via-black/30 to-black/10 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-300 rounded-lg" />
              <div className="absolute inset-0 z-[6] flex items-center justify-center p-2 sm:p-4">
                <div className="text-center w-full px-1 sm:px-3">
                  {item.price > 0 && (
                    <div className="group-hover:scale-110 scale-100 transition-transform duration-300 font-cardo text-white font-bold text-xs sm:text-base lg:text-lg mb-1 sm:mb-2 drop-shadow-lg break-words">
                      {getPolishCurrency(item.price)}
                    </div>
                  )}
                  {item.price === 0 && (
                    <div className="text-white font-bold text-xs sm:text-base lg:text-lg mb-1 sm:mb-2 drop-shadow-lg font-ubuntu break-words">
                      Zapytaj o cenę
                    </div>
                  )}
                  <h2 className="font-cardo text-white font-bold line-clamp-2 text-xs sm:text-sm lg:text-base drop-shadow-lg break-words px-1">
                    {item.title}
                  </h2>
                </div>
              </div>
              <div className="relative w-full overflow-hidden rounded-lg">
                <Image
                  width={800}
                  height={800}
                  src={item.mainImage || item.images[0]?.src}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 max-w-full"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
