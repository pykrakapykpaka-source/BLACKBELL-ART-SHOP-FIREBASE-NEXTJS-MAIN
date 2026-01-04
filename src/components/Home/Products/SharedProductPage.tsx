import { getProducts } from "@/lib/getProducts";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/Home/Products/ProductDetailPage";
import { Metadata } from "next";

type Category = "prints" | "stickers" | "paintings";

/**
 * Generate static params for all products in a given category.
 * This function is called at build time to pre-generate all product pages.
 */
export async function generateStaticParamsForCategory(category: Category) {
  try {
    const products = await getProducts();
    
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    
    const categoryProducts = products.filter((p: any) => 
      p && p.title && p.category === category
    );
    
    return categoryProducts.map((product: any) => ({
      slug: polishToEnglish(product.title),
    }));
  } catch (error) {
    console.error(`[generateStaticParamsForCategory] Error for category ${category}:`, error);
    return [];
  }
}

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
  try {
    const { slug } = await params;
    const products = await getProducts();
    
    // Ensure products is an array
    if (!Array.isArray(products) || products.length === 0) {
      console.error(`[SharedProductPage] No products found for category: ${category}, slug: ${slug}`);
      notFound();
    }
    
    // Find product by matching slug and category
    // Try exact match first
    let product = products.find((p: any) => {
      if (!p || !p.title || !p.category) {
        return false;
      }
      const productSlug = polishToEnglish(p.title);
      return productSlug === slug && p.category === category;
    });

    // If not found, try case-insensitive and normalized matching
    if (!product) {
      product = products.find((p: any) => {
        if (!p || !p.title || !p.category || p.category !== category) {
          return false;
        }
        const productSlug = polishToEnglish(p.title);
        // Normalize both slugs for comparison (remove extra dashes, etc.)
        const normalizedProductSlug = productSlug.toLowerCase().replace(/-+/g, "-").trim();
        const normalizedSlug = slug.toLowerCase().replace(/-+/g, "-").trim();
        return normalizedProductSlug === normalizedSlug;
      });
    }

    if (!product) {
      // Log for debugging - this helps identify slug matching issues
      const availableSlugs = products
        .filter((p: any) => p.category === category)
        .map((p: any) => ({ 
          title: p.title, 
          slug: polishToEnglish(p.title),
          id: p.id 
        }));
      console.error(
        `[SharedProductPage] Product not found - Category: ${category}, Slug: ${slug}`,
        `\nLooking for slug: "${slug}"`,
        `\nAvailable slugs for category "${category}":`,
        availableSlugs.map(s => `  - "${s.slug}" (from: "${s.title}")`).join('\n')
      );
      notFound();
    }

    return <ProductDetailPage product={product} products={products} />;
  } catch (error) {
    console.error(`[SharedProductPage] Error for category ${category}:`, error);
    notFound();
  }
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
  try {
    const { slug } = await params;
    const products = await getProducts();
    
    if (!Array.isArray(products) || products.length === 0) {
      return {
        title: "Produkt nie znaleziony",
      };
    }
    
    const product = products.find((p: any) => {
      if (!p || !p.title || !p.category) {
        return false;
      }
      const productSlug = polishToEnglish(p.title);
      return productSlug === slug && p.category === category;
    });

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
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return {
      title: "Produkt nie znaleziony",
    };
  }
}

