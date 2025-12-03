import { getDocuments } from "@/firebase";
import Link from "next/link";
import { FaBlog, FaShoppingCart, FaChartLine } from "react-icons/fa";
import VisitsStats from "@/components/admin/VisitsStats";

export default async function AdminPage() {
  const products = await getDocuments("products");
  const orders = await getDocuments("orders");
  const posts = await getDocuments("blog");
  const pageViews = await getDocuments("page-views");

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold text-white mb-8">
        Panel administracyjny
      </h1>

      {/* Visits Statistics */}
      {pageViews && pageViews.length > 0 && (
        <VisitsStats pageViews={pageViews} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products Management */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Produkty</h2>
            <FaShoppingCart className="text-blue-400 text-2xl" />
          </div>
          <p className="text-gray-400 mb-4">Zarządzaj produktami w sklepie</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Łącznie produktów:</span>
              <span className="text-white font-medium">
                {products?.length || 0}
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Link
              href="/admin/shop"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded transition-colors"
            >
              Zarządzaj produktami
            </Link>
            <Link
              href="/admin/shop/add-product"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded transition-colors"
            >
              Dodaj produkt
            </Link>
          </div>
        </div>

        {/* Orders Management */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Zamówienia</h2>
            <FaChartLine className="text-green-400 text-2xl" />
          </div>
          <p className="text-gray-400 mb-4">
            Przeglądaj i zarządzaj zamówieniami
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Łącznie zamówień:</span>
              <span className="text-white font-medium">
                {orders?.length || 0}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/shop/orders"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded transition-colors"
            >
              Przeglądaj zamówienia
            </Link>
          </div>
        </div>

        {/* Blog Management */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Blog</h2>
            <FaBlog className="text-purple-400 text-2xl" />
          </div>
          <p className="text-gray-400 mb-4">Zarządzaj postami na blogu</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Łącznie postów:</span>
              <span className="text-white font-medium">
                {posts?.length || 0}
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Link
              href="/admin/blog"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded transition-colors"
            >
              Zarządzaj blogiem
            </Link>
            <Link
              href="/admin/blog/new"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded transition-colors"
            >
              Dodaj post
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Szybkie statystyki
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded p-4">
            <div className="text-2xl font-bold text-white">
              {products?.length || 0}
            </div>
            <div className="text-gray-400 text-sm">Produktów</div>
          </div>
          <div className="bg-gray-700 rounded p-4">
            <div className="text-2xl font-bold text-white">
              {orders?.length || 0}
            </div>
            <div className="text-gray-400 text-sm">Zamówień</div>
          </div>
          <div className="bg-gray-700 rounded p-4">
            <div className="text-2xl font-bold text-white">
              {posts?.length || 0}
            </div>
            <div className="text-gray-400 text-sm">Postów na blogu</div>
          </div>
        </div>
      </div>
    </div>
  );
}
