import { getDocumentsWithIds } from "@/firebase";
import AdminOrders from "./AdminOrders";
export const dynamic = "force-dynamic";
export const revalidate = 0; // Always fetch fresh data for admin pages

export default async function Page() {
  let orders: any = [];
  let leads: any = [];
  
  try {
    orders = await getDocumentsWithIds("orders");
    if (!Array.isArray(orders)) {
      console.error("[Admin Orders] Orders is not an array:", orders);
      orders = [];
    }
  } catch (error) {
    console.error("[Admin Orders] Error fetching orders:", error);
    orders = [];
  }
  
  try {
    leads = await getDocumentsWithIds("leads");
    if (!Array.isArray(leads)) {
      console.error("[Admin Orders] Leads is not an array:", leads);
      leads = [];
    }
  } catch (error) {
    console.error("[Admin Orders] Error fetching leads:", error);
    leads = [];
  }
  
  return (
    <div className="relative">
      <AdminOrders data={orders} data2={leads} />
    </div>
  );
}
