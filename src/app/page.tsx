import React from "react";
import Orders from "@/components/Home/Orders";
import PrepareCart from "@/components/Home/PrepareCart";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import ClientFormWrapper from "@/components/Home/CtaForm/ClientFormWrapper";
import TrackUniqueVisit from "@/components/Home/TrackUniqueVisit";
import { getDocumentsWithIds } from "@/firebase";
export const dynamic = "force-dynamic"; // Always fetch fresh data
export const revalidate = 0; // Disable static generation cache

export default async function Page() {
  let products: any = [];
  try {
    products = await getDocumentsWithIds("products");
    // Ensure products is always an array
    if (!Array.isArray(products)) {
      console.error("[Page] Products is not an array:", products);
      products = [];
    }
    // Log product count for debugging (always log in production too)
    console.log(`[Page] Fetched ${products.length} products`);
    if (products.length === 0) {
      console.warn("[Page] WARNING: No products found! Check Firebase connection and products collection.");
    }
  } catch (error) {
    console.error("[Page] Error fetching products:", error);
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
