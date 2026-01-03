import SharedProductPage, { generateProductMetadata, generateStaticParamsForCategory } from "@/components/Home/Products/SharedProductPage";
import { Metadata } from "next";

export const revalidate = 1800; // Revalidate every 30 minutes (1800 seconds)

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate static params at build time for all sticker products.
 * This pre-generates all product pages as static HTML during build.
 */
export async function generateStaticParams() {
  return generateStaticParamsForCategory("stickers");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateProductMetadata(params, "stickers", "Naklejki artystyczne");
}

export default async function StickerProductPage({ params }: Props) {
  return <SharedProductPage params={params} category="stickers" />;
}

