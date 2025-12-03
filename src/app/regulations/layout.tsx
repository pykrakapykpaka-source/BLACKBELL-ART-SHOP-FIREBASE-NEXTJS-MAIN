import { Metadata, Viewport } from "next";
import Orders from "../../components/Home/Orders";
import ShopFooter from "../../components/Home/ShopFooter";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-[#ffffff]`}>
      {children}
      <Orders />
      <ShopFooter />
    </div>
  );
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};
export const metadata: Metadata = {
  publisher: "BlackBell Art Studio",
  manifest: "/manifest.json",
  verification: {
    google: "google85185d3abec28326.html",
  },
  icons: [
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
  title: "Unikalne obrazy na płótnie na zamówienie | Sklep z obrazami | Sztuka",
  description:
    "Obrazy na zamówienie, unikalne dzieła sztuki – ręcznie malowane obrazy na płótnie. Sprawdź naszą ofertę!",
  openGraph: {
    type: "website",
    url: "https://blackbellartstudio.pl",

    title:
      "Unikalne obrazy na płótnie na zamówienie | Sklep z obrazami | Sztuka",
    description:
      "Obrazy na zamówienie, unikalne dzieła sztuki – ręcznie malowane obrazy na płótnie. Sprawdź naszą ofertę!",
    siteName: "Black Bell Tattoo & Art",
  },
};
