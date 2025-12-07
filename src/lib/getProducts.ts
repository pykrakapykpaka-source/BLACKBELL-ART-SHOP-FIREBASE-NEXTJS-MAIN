"use server";

import { getDocuments } from "@/firebase";

export async function getProducts() {
  try {
    const products: any = await getDocuments("products");
    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty array instead of crashing the page
    return [];
  }
}
