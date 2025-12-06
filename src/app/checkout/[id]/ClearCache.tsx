"use client";
import { addDocument, updateDocument } from "@/firebase";
import Script from "next/script";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function ClearCache({
  order,
  price,
}: {
  order: any;
  price: any;
}) {
  const cart = useSelector((state: any) => state.shop.cart);
  useEffect(() => {
    addDocument("orders", order.id, {
      ...order,
      creationTime: Date.now(),
      price: price,
    });
    cart.forEach((product: any) => {
      // Assuming you have a function to update the product by id
      if (product.category === "paintings") {
        updateDocument(["sold"], [true], "products", product.id);
      }
    });
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
  }, []);
  return (
    <div>
      <Script
        id="conversion"
        src="https://www.googletagmanager.com/gtag/js?id=AW-10818390066"
        strategy="afterInteractive"
      >
        {`gtag('event', 'conversion', {
      'send_to': 'AW-10818390066/GxEvCIemvLEaELKQzqYo',
      'value': 1.0,
      'currency': 'PLN',
      'transaction_id': '${order.id}'
      });`}
      </Script>
    </div>
  );
}
