"use client";
import { ArtworkData } from "@/types";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { getPolishCurrency } from "../../../../utils/getPolishCurrency";
import { removeFromCart } from "@/redux/slices/shopSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Cart({
  isCartOpen,
  setCartOpen,
  cart,
  setIsCheckout,
}: {
  isCartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cart: any;
  setIsCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  return (
    <>
      {isCartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="h-screen w-full bg-black/50 fixed left-0 top-0 z-[79]"
        ></div>
      )}
      {isCartOpen && (
        <div className="z-[80] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[76vh] w-[90%] md:w-[30rem] overflow-y-scroll bg-white p-6 h-max">
          <h2 className="font-cardo text-black font-bold text-2xl">Koszyk</h2>
          <p className="text-sm text-gray-700">
            Przejdź do płatności lub kontynuuj zakupy.
          </p>
          <div className="flex flex-col items-center justify-center w-full">
            {!cart?.length && (
              <>
                <FaShoppingCart className="text-7xl text-gray-400 mt-12" />
                <p className="text-gray-400 mt-5 text-center text-sm lg:text-base mb-12">
                  Twój koszyk jest pusty...
                </p>
              </>
            )}
            {cart?.length !== 0 && (
              <div className="grid grid-cols-1 mt-4 text-zinc-800 drop-shadow-md shadow-black w-full">
                {cart?.map((item: ArtworkData, i: any) => (
                  <div key={i}>
                    <div className="flex flex-row items-start justify-between w-full">
                      <div className="flex flex-row w-full items-start justify-start h-full">
                        <div className="aspect-square h-[85px] w-[85px] overflow-hidden shadow-md shadow-gray-300">
                          <Image
                            width={333}
                            height={333}
                            src={item?.mainImage || item?.images[0].src}
                            alt={item.title}
                            className="w-full h-full object-cover my-auto"
                          />
                        </div>

                        <div className="flex flex-col items-start justify-start pl-2 w-2/3">
                          <div className="">
                            <p className="font-bold font-cardo">{item.title}</p>
                            <p className="text-black text-sm font-cardo">
                              {item.dimensions}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              dispatch(removeFromCart(item));
                            }}
                            className="text-sm text-gray-500 underline hover:text-gray-600"
                          >
                            usuń
                          </button>
                        </div>
                      </div>
                      <div className="text-lg w-max">
                        <div className="w-max font-cardo">
                          {getPolishCurrency(item.price)}
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-300 my-4" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-6 relative">
            <div className="space-y-4 text-center">
              {cart?.length === 0 && (
                <button
                  disabled={!cart?.length}
                  className="disabled:cursor-not-allowed duration-200 block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-900 w-full"
                >
                  Podsumowanie
                </button>
              )}
              {cart?.length > 0 && (
                <button
                  title="Przejdź do płatności"
                  onClick={() => {
                    setCartOpen(false);
                    setIsCheckout(true);
                  }}
                  className="duration-200 block rounded bg-black px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-800 w-full"
                >
                  Podsumowanie
                </button>
              )}
              <button
                onClick={() => setCartOpen(false)}
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
              >
                Kontynuuj zakupy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
