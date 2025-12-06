import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "@/redux/Provider";
import Script from "next/script";
import Header from "../components/Home/Hero/Header";
import { Cardo } from "next/font/google";
import { Ubuntu } from "next/font/google";
import PrepareCart from "../components/Home/PrepareCart";
import Toast from "@/components/Toast";
import ShopFooter from "@/components/Home/ShopFooter";
import { getBlogCount } from "@/lib/getBlogCount";

const cardo = Cardo({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cardo",
});
const ubuntu = Ubuntu({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogCount = await getBlogCount();
  
  return (
    <html className="overflow-x-hidden" lang="pl">
      <body className={`${cardo.variable} ${ubuntu.variable}`}>
        <Toast />
        <Providers>
          <PrepareCart />
          <Header blogCount={blogCount} />
          {children}
          <ShopFooter blogCount={blogCount} />
        </Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SYTL7MG8Q4" />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SYTL7MG8Q4');
          `}
        </Script>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
  colorScheme: "light",
};
export const metadata: Metadata = {
  publisher: "blackbellstudio.pl",
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
  title: "Sklep z Obrazami | Obrazy na zamówienie | Obrazy na płótnie",
  description:
    "Kup oryginalne obrazy na płótnie: obrazy olejne, portrety i abstrakcje. Kup unikalny obraz dla siebie lub na prezent już dziś.",
  openGraph: {
    type: "website",
    url: "https://blackbellstudio.pl",
    title: "Sklep z Obrazami | Obrazy na zamówienie | Obrazy na płótnie",
    description:
      "Kup oryginalne obrazy na płótnie: obrazy olejne, portrety i abstrakcje. Kup unikalny obraz dla siebie lub na prezent już dziś.",
    siteName: "blackbellstudio.pl",
  },
};
