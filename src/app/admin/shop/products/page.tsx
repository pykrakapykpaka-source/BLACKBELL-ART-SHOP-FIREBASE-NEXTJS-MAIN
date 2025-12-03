import AdminProducts from "./AdminProducts";
import Ranking from "./Ranking";
import { getProducts } from "@/lib/getProducts";
export const dynamic = "force-dynamic";
export default async function Page() {
  const products: any = await getProducts();
  return (
    <div className="p-6 lg:p-16">
      <h1 className="text-3xl font-cardo text-black">Obrazy na stronie</h1>
      <Ranking data={products} />
      <AdminProducts data={products} />
    </div>
  );
}
