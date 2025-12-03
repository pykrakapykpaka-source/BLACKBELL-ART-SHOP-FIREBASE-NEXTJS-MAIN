"use client";
import { ArtworkData } from "@/types";
import { useState } from "react";
import Viewer from "@/components/Viewer";
import { useSelector } from "react-redux";
import ProductImages from "../ProductImages";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import ProjectImages from "../ProjectImages";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import ProductInteractions from "./ProductInteractions";
import Disclaimer from "./Disclaimer";
import MoreProducts from "./MoreProducts";
import Checkout from "@/components/Checkout";
import Link from "next/link";
import { FaLongArrowAltLeft, FaPhone, FaShoppingCart } from "react-icons/fa";

export default function ProductDetailPage({
  product,
  products,
}: {
  product: ArtworkData;
  products: any[];
}) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const cart = useSelector((state: any) => state.shop.cart);
  const [isImageOpen, setImageOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [openedPiecePricing, setOpenedPiecePricing] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ phone: "", name: "" });
  const [isCheckout, setIsCheckout] = useState(false);

  return (
    <div className="bg-white flex flex-col justify-center w-full">
      {isCheckout && (
        <Checkout setIsCheckout={setIsCheckout} isCheckout={isCheckout} />
      )}
      <Cart
        isCartOpen={isCartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        setIsCheckout={setIsCheckout}
      />
      <ProjectImages
        service={product}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setImageOpen={setImageOpen}
        isImageOpen={isImageOpen}
      />
      <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw] mt-[76px]">
        <div className="mt-8 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-ubuntu text-sm sm:text-base group"
          >
            <FaLongArrowAltLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
            Powrót do sklepu
          </Link>
        </div>
        <ProductDetails product={product} />
        
        <ProductImages
          product={product}
          setCurrentIndex={setCurrentIndex}
          setImageOpen={setImageOpen}
        />
        <ProductInteractions
          setCartOpen={setCartOpen}
          setOpenedPiecePricing={setOpenedPiecePricing}
          openedPiecePricing={openedPiecePricing}
          product={product}
          cart={cart}
          isCartOpen={isCartOpen}
          isSending={isSending}
          setIsSending={setIsSending}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="mt-8">
          <div className="text-gray-800 font-cardo text-base sm:text-lg font-semibold border border-gray-300 px-4 py-2 w-max bg-gradient-to-br from-gray-50 to-gray-100 mb-6 rounded-lg shadow-sm">
            Parę słów o obrazie
          </div>
          <div className="prose prose-sm sm:prose-base max-w-none">
            <Viewer value={product.description} />
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {product?.tags.map((item: any, i: any) => (
              <div 
                key={i} 
                className="text-gray-600 font-ubuntu text-sm px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                #{polishToEnglish(item.toLowerCase())}
              </div>
            ))}
          </div>
        </div>
        <Disclaimer />
        <MoreProducts products={products} product={product} />
        <div className="sticky bottom-0 left-0 right-0 w-full h-14 bg-gradient-to-t from-gray-800 to-gray-700 text-gray-100 rounded-t-2xl grid grid-cols-3 z-[110] shadow-lg border-t border-gray-600/50">
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-xs hover:bg-gray-600/50 transition-colors duration-200 rounded-tl-2xl active:bg-gray-600"
          >
            <FaLongArrowAltLeft className="text-lg mb-1" />
            Powrót
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="flex flex-col items-center justify-center text-xs border-x border-gray-600/50 hover:bg-gray-600/50 transition-colors duration-200 relative active:bg-gray-600"
          >
            <div className="relative">
              <FaShoppingCart className="text-lg mb-1" />
              {cart?.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {cart.length}
                </div>
              )}
            </div>
            Koszyk
          </button>
          <Link
            href="tel:+48570974740"
            className="flex flex-col items-center justify-center text-xs hover:bg-gray-600/50 transition-colors duration-200 rounded-tr-2xl active:bg-gray-600"
          >
            <FaPhone className="text-lg mb-1" />
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}

