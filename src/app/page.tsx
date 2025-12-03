import React from "react";
import Orders from "@/components/Home/Orders";
import PrepareCart from "@/components/Home/PrepareCart";
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import ClientFormWrapper from "@/components/Home/CtaForm/ClientFormWrapper";
import { addDocument, getDocuments } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
export const dynamic = "force-dynamic";
export default async function Page() {
  const products: any = await getDocuments("products");
  await addDocument("page-views", uuidv4(), { date: Date.now(), page: "shop" });
  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <PrepareCart />
      <Hero />
      <ClientFormWrapper />
      <Products products={products} />
      <Orders />
    </div>
  );
}
