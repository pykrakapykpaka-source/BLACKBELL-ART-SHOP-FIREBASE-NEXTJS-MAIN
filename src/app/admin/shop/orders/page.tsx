import { getDocuments } from "@/firebase";
import AdminOrders from "./AdminOrders";
export const dynamic = "force-dynamic";
export default async function Page() {
  const orders: any = await getDocuments("orders");
  const leads: any = await getDocuments("leads");
  return (
    <div className="relative">
      <AdminOrders data={orders} data2={leads} />
    </div>
  );
}
