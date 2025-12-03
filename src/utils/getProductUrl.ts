import { polishToEnglish } from "../../utils/polishToEnglish";

const categoryUrlMap: { [key: string]: string } = {
  paintings: "/oryginalne-obrazy-na-plotnie",
  stickers: "/naklejki-artystyczne",
  prints: "/druki-obrazow",
};

export function getProductUrl(product: { category: string; title: string }): string {
  const baseUrl = categoryUrlMap[product.category] || "/produkty";
  const slug = polishToEnglish(product.title);
  return `${baseUrl}/${slug}`;
}

