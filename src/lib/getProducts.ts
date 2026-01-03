"use server";

import { getDocumentsWithIds } from "@/firebase";

export async function getProducts() {
  try {
    const products: any = await getDocumentsWithIds("products");
    // Ensure products is always an array
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return [];
    }
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty array instead of crashing the page
    return [];
  }
}
