import { getProducts } from "@/lib/getProducts";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/Home/Products/ProductDetailPage";
import { Metadata } from "next";

type Category = "prints" | "stickers" | "paintings";

type Props = {
  params: Promise<{ slug: string }>;
  category: Category;
};

/**
 * Shared component for all product detail pages.
 * This ensures all three routes (/druki-obrazow, /naklejki-artystyczne, /oryginalne-obrazy-na-plotnie)
 * use the exact same design and layout.
 * 
 * To modify the design, edit ProductDetailPage.tsx - changes will apply to all routes automatically.
 */
export default async function SharedProductPage({ 
  params, 
  category 
}: Props) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find(
    (p: any) => polishToEnglish(p.title) === slug && p.category === category
  );

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} products={products} />;
}

/**
 * Helper function to generate metadata for product pages.
 * Used by all three category routes to ensure consistent metadata generation.
 */
export async function generateProductMetadata(
  params: Promise<{ slug: string }>,
  category: Category,
  categoryTitle: string
): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find(
    (p: any) => polishToEnglish(p.title) === slug && p.category === category
  );

  if (!product) {
    return {
      title: "Produkt nie znaleziony",
    };
  }

  return {
    title: `${product.title} - ${categoryTitle}`,
    description: product.description?.replace(/<[^>]*>/g, "").substring(0, 160) || "",
    openGraph: {
      title: product.title,
      description: product.description?.replace(/<[^>]*>/g, "").substring(0, 160) || "",
      images: product.mainImage ? [product.mainImage] : product.images?.[0]?.src ? [product.images[0].src] : [],
    },
  };
}

