"use client";
/* eslint-disable @next/next/no-img-element */
import { ArtworkData } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaChevronLeft,
  FaShoppingCart,
} from "react-icons/fa";
import { getPolishCurrency } from "../../../utils/getPolishCurrency";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CheckoutSummary({
  cart,
  setIsCheckout,
}: {
  cart: any;
  setIsCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (cart?.length) {
      setLoading(false);
    }
  }, [cart?.length]);
  const cartPrice = cart?.reduce((acc: any, item: any) => {
    return acc + item.price;
  }, 0);

  return (
    <div className="flex flex-col w-full h-full">
      {isLoading ? (
        <div className="fixed left-0 top-0 h-full w-screen bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-white text-gray-800 p-4 mx-auto rounded-md flex flex-col items-center justify-center">
            <img
              className="h-12 w-12"
              src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/abfa05c49acf005b8b1e0ef8eb25a67a7057eb20/svg-css/blocks-shuffle-2.svg"
              alt=""
            />
            <h2 className="font-bold mt-3 text-center">
              Blackbell Art <br /> Studio
            </h2>
          </div>
        </div>
      ) : (
        <>
          {!cart?.length && (
            <>
              <FaShoppingCart className="text-7xl text-black mt-12" />
              <p className="text-black mt-5 text-center">
                Twój koszyk jest pusty...
              </p>
            </>
          )}
          {cart?.length && (
            <div>
              <button
                onClick={() => setIsCheckout(false)}
                className="gap-2 text-white bg-black px-3 py-1 text-sm flex flex-row items-center mb-3"
              >
                <FaArrowLeft />
                Powrót
              </button>

              <h2 className="text-gray-800 text-center text-2xl font-cardo">
                Podsumowanie
              </h2>
              <div className="my-4 flex flex-col w-max mx-auto scale-110">
                <div className="flex items-center justify-center">
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                  <div className="bg-gray-200 h-px w-16" />
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                  <div className="bg-gray-200 h-px w-16" />
                  <div className="border border-gray-200 h-4 rounded-full w-4" />
                </div>
                <div className="justify-between gap-8 text-xs w-max mt-1 text-gray-400 flex items-center">
                  <div className="text-green-500">ZAKUPY</div>
                  <div className="text-green-500">PŁATNOŚĆ</div>
                  <div className="">ODBIÓR</div>
                </div>
              </div>

              <div className="grid grid-cols-1 mt-6 text-black w-full ">
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
                        <div className="pl-2 w-2/3">
                          <p className="font-bold font-cardo">{item.title}</p>
                          <p className="text-black text-sm font-cardo">
                            {item.dimensions}
                          </p>
                        </div>
                      </div>
                      <div className="text-lg w-max">
                        <div className="w-max font-cardo">
                          {getPolishCurrency(item.price)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-200 h-px my-4" />
                  </div>
                ))}
              </div>

              <div className=" text-black">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-lg">Wysyłka</p>
                    {cartPrice < 250 && (
                      <p className="text-blue-500 text-xs">
                        Brakuje Ci {getPolishCurrency(250 - cartPrice)} do
                        darmowej wysyłki
                      </p>
                    )}
                  </div>
                  <p className="text-lg font-cardo">
                    {cartPrice > 250 && "0,00 zł"}
                    {cartPrice < 250 && getPolishCurrency(20)}
                  </p>
                </div>
                <div className="bg-gray-200 h-px my-4" />
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-lg">Do zapłaty</p>
                  <p className="text-lg font-cardo">
                    {getPolishCurrency(
                      cartPrice < 250 ? cartPrice + 20 : cartPrice
                    )}
                  </p>
                </div>
                <div className="bg-gray-200 h-px my-4" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
