import React from "react";
import Orders from "@/components/Home/Orders";
import PrepareCart from "@/components/Home/PrepareCart";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import ClientFormWrapper from "@/components/Home/CtaForm/ClientFormWrapper";
import TrackUniqueVisit from "@/components/Home/TrackUniqueVisit";
import { getDocuments } from "@/firebase";
export const dynamic = "force-dynamic";
export default async function Page() {
  const products: any = await getDocuments("products");
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
