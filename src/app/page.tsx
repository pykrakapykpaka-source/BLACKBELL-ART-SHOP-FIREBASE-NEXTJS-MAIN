import React from "react";
import Orders from "@/components/Home/Orders";
import PrepareCart from "@/components/Home/PrepareCart";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import ClientFormWrapper from "@/components/Home/CtaForm/ClientFormWrapper";
import TrackUniqueVisit from "@/components/Home/TrackUniqueVisit";
import { getDocumentsWithIds } from "@/firebase";
export const revalidate = 1800; // Revalidate every 30 minutes (1800 seconds)

export default async function Page() {
  let products: any = [];
  try {
    products = await getDocumentsWithIds("products");
    // Ensure products is always an array
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      products = [];
    }
    // Log product count for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log(`[Page] Fetched ${products.length} products`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }
  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <TrackUniqueVisit />
      <PrepareCart />
      <Hero />
      <ClientFormWrapper />
      <Products products={products} />
      <Orders />
    </div>
  );
}
