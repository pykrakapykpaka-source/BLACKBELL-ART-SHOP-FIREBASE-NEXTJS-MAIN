import Link from "next/link";
import {
  FaArtstation,
  FaClock,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMap,
  FaPencilAlt,
  FaPhone,
  FaShoppingCart,
} from "react-icons/fa";
import PrivacyButton from "./PrivacyButton";

export default function ShopFooter({
  isProductSlug,
  blogCount = 0,
}: {
  isProductSlug?: boolean;
  blogCount?: number;
}) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div
        className={`py-16 px-5 ${
          isProductSlug
            ? "px-6 md:px-[8vw] lg:px-3 lg:pl-12 xl:px-12"
            : "lg:px-[8vw] xl:px-[12vw]"
        }`}
      >
        <div
          className={`grid grid-cols-1 ${
            isProductSlug
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-4"
          } gap-8`}
        >
          {/* Contact Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Kontakt
            </h3>
            <div className="space-y-3">
              <Link
                className="flex items-center text-sm hover:text-white transition-colors"
                href="tel:570974740"
                title="Zadzwoń"
              >
                <FaPhone className="w-4 h-4 mr-3 text-gray-400" />
                +48 570 974 740
              </Link>
              <Link
                className="flex items-center text-sm hover:text-white transition-colors"
                href="mailto:eliza.czer09@gmail.com"
                title="Wyślij email"
              >
                <FaEnvelope className="w-4 h-4 mr-3 text-gray-400" />
                eliza.czer09@gmail.com
              </Link>
            </div>
          </section>

          {/* Social Media Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Social Media
            </h3>
            <div className="space-y-3">
            <Link
                target="_blank"
                href="https://www.facebook.com/blackbell.c.e"
                className="flex items-center text-sm hover:text-white transition-colors"
                title="Obserwuj na facebooku"
              >
                <FaFacebook className="w-4 h-4 mr-3 text-gray-400" />
                @blackbell.c.e
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/blackbell.ce/"
                className="flex items-center text-sm hover:text-white transition-colors"
                title="Obserwuj na instagramie"
              >
                <FaInstagram className="w-4 h-4 mr-3 text-gray-400" />
                @blackbell.c.e
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/blackbellarttattoo/"
                className="flex items-center text-sm hover:text-white transition-colors"
                title="Obserwuj na instagramie"
              >
                <FaInstagram className="w-4 h-4 mr-3 text-gray-400" />
                @blackbellarttattoo
              </Link>
              
            </div>
          </section>

          {/* Quick Links Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Szybkie linki
            </h3>
            <div className="space-y-3">
              <Link
                href="/"
                className="flex items-center text-sm hover:text-white transition-colors"
                title="Sklep z obrazami na płótnie"
              >
                <FaShoppingCart className="w-4 h-4 mr-3 text-gray-400" />
                Sklep
              </Link>
              {blogCount > 0 && (
                <Link
                  href="/blog"
                  className="flex items-center text-sm hover:text-white transition-colors"
                  title="Sprawdź bloga"
                >
                  <FaArtstation className="w-4 h-4 mr-3 text-gray-400" />
                  Blog
                </Link>
              )}
              <Link
                href="/sitemap.xml"
                className="flex items-center text-sm hover:text-white transition-colors"
                title="Zobacz sitemap.xml"
              >
                <FaMap className="w-4 h-4 mr-3 text-gray-400" />
                Mapa strony
              </Link>
            </div>
          </section>

          {/* Legal Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Informacje prawne
            </h3>
            <div className="space-y-3">
              <Link
                href="/regulations"
                className="text-sm hover:text-white transition-colors block"
                title="Regulamin sklepu i polityka prywatności"
              >
                Regulamin sklepu
              </Link>
              <PrivacyButton isProductSlug={isProductSlug} />
            </div>
          </section>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 py-6 px-5 lg:px-[8vw] xl:px-[12vw]">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} blackbellartstudio.pl. Wszystkie prawa
            zastrzeżone.
          </div>
          <div className="text-xs text-gray-400">
            Projekt i realizacja: blackbellartstudio.pl
          </div>
        </div>
      </div>
    </footer>
  );
}
