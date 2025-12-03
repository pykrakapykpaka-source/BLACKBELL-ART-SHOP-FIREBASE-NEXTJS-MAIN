"use client";
import { ArtworkData } from "@/types";
import ProductCard from "./ProductCard";

export default function Product({
  product,
}: {
  product: ArtworkData;
}) {
  return <ProductCard product={product} />;
}
