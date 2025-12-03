import SharedProductPage, { generateProductMetadata } from "@/components/Home/Products/SharedProductPage";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateProductMetadata(params, "paintings", "Oryginalne obrazy na płótnie");
}

export default async function PaintingProductPage({ params }: Props) {
  return <SharedProductPage params={params} category="paintings" />;
}

