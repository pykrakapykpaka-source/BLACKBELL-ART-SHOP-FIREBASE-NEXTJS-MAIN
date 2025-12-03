import SharedProductPage, { generateProductMetadata } from "@/components/Home/Products/SharedProductPage";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateProductMetadata(params, "prints", "Druki obrazów");
}

export default async function PrintProductPage({ params }: Props) {
  return <SharedProductPage params={params} category="prints" />;
}

