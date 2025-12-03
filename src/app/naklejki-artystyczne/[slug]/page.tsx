import SharedProductPage, { generateProductMetadata } from "@/components/Home/Products/SharedProductPage";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateProductMetadata(params, "stickers", "Naklejki artystyczne");
}

export default async function StickerProductPage({ params }: Props) {
  return <SharedProductPage params={params} category="stickers" />;
}

