"use server";

export async function getOrders() {
  const orders = fetch(
    `/api/stripe/orders?secret=${process.env.API_SECRET_KEY}`,
    { cache: "no-store" }
  ).then((res) => {
    res.json();
  });

  return orders;
}
