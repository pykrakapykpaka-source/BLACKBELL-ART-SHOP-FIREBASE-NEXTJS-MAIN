"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../Products/Cart";
import { useState } from "react";
import { useSelector } from "react-redux";
import Checkout from "@/components/Checkout";

export default function Header({ blogCount = 0 }: { blogCount?: number }) {
  const pathname = usePathname();
  const [isCartOpen, setCartOpen] = useState(false);
  const cart = useSelector((state: any) => state.shop.cart);
  const [isCheckout, setIsCheckout] = useState(false);
  return (
    <>
      {isCheckout && (
        <Checkout setIsCheckout={setIsCheckout} isCheckout={isCheckout} />
      )}
      <header
        className={`fixed z-[100] w-full bg-black shadow-md ${
          pathname.includes("admin") && "hidden"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-10">
          <Link href="/" className="flex items-center space-x-3 text-white">
            <Image
              src="/images/logoWhite.png"
              width={40}
              height={40}
              alt="Blackbell Art logo"
              className="h-[40px] w-auto mix-blend-difference"
            />
            <span className="text-2xl font-bold">Blackbell Art</span>
          </Link>

          <div className="flex items-center space-x-6">
            {blogCount > 0 && (
              <Link
                href="/blog"
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                Blog
              </Link>
            )}
            <button
              onClick={() => setCartOpen(true)}
              className="bg-white w-11 h-11 flex items-center justify-center relative"
            >
              <FaShoppingCart className="w-6 h-6" />
              {cart && cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>
      <Cart
        isCartOpen={isCartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        setIsCheckout={setIsCheckout}
      />
    </>
  );
}
