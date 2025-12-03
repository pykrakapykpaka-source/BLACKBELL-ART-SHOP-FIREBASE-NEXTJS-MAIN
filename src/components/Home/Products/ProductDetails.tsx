import { getPolishCurrency } from "../../../../utils/getPolishCurrency";

export default function ProductDetails({ product }: { product: any }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h1 className="font-cardo text-gray-900 text-2xl sm:text-3xl xl:text-4xl font-bold leading-tight mb-4">
        {product.title}
      </h1>
      <div className="mt-4 flex flex-wrap w-full gap-x-6 gap-y-3">
        {product.category !== "stickers" && (
          <div className="text-gray-700 text-sm sm:text-base lg:text-lg font-ubuntu">
            <span className="text-gray-500 font-light">Wymiary:</span>{" "}
            <strong className="font-cardo font-semibold text-gray-900">{product.dimensions}</strong>
          </div>
        )}
        <div className="text-gray-700 text-sm sm:text-base lg:text-lg font-ubuntu">
          <span className="text-gray-500 font-light">Autor:</span>{" "}
          <strong className="font-cardo font-semibold text-gray-900">
            Eliza Czerwińska (blackbell.c.e)
          </strong>
        </div>
        {product.category !== "stickers" && product.category !== "prints" && (
          <div className="text-gray-700 text-sm sm:text-base lg:text-lg font-ubuntu">
            <span className="text-gray-500 font-light">Oryginał:</span>{" "}
            <strong className="font-cardo font-semibold text-gray-900">Tak</strong>
          </div>
        )}
        {product.category === "stickers" && (
          <div className="text-gray-700 text-sm sm:text-base lg:text-lg font-ubuntu">
            <span className="text-gray-500 font-light">Rodzaj:</span>{" "}
            <strong className="font-cardo font-semibold text-gray-900">Naklejki</strong>
          </div>
        )}
        {product.category === "stickers" && (
          <div className="text-gray-700 text-sm sm:text-base lg:text-lg font-ubuntu">
            <span className="text-gray-500 font-light">Sztuki:</span>{" "}
            <strong className="font-cardo font-semibold text-gray-900">Wiele</strong>
          </div>
        )}
        {product.category === "prints" && (
          <div className="text-gray-700 text-sm sm:text-base lg:text-lg font-ubuntu">
            <span className="text-gray-500 font-light">Rodzaj:</span>{" "}
            <strong className="font-cardo font-semibold text-gray-900">Druk</strong>
          </div>
        )}
      </div>
      {product.category === "stickers" && (
        <div className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed font-ubuntu">
          Naklejki wysyłam w zestawie, holograficzne i zwykłe. Wycinam je
          ręcznie i w różnych rozmiarach, aby każda znalazła swoje miejsce. W
          zestawie najprawdopodobniej znajdziesz dodatki od serca.
        </div>
      )}
      {product.price > 0 && (
        <span className="font-cardo w-max block text-white bg-gradient-to-r from-gray-900 to-black px-6 py-3 mt-6 rounded-xl shadow-lg font-bold text-lg sm:text-xl">
          {getPolishCurrency(product.price)}
        </span>
      )}
    </div>
  );
}
