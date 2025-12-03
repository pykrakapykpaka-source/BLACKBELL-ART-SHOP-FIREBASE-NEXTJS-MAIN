import { addDocument } from "@/firebase";
import { setCart } from "@/redux/slices/shopSlice";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { FaBell, FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const setLocalStorage = (key: any, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export default function ProductInteractions({
  product,
  cart,
  setCartOpen,
  setOpenedPiecePricing,
  openedPiecePricing,
  isCartOpen,
  formData,
  setFormData,
  isSending,
  setIsSending,
}: {
  product: any;
  cart: any;
  setCartOpen: any;
  openedPiecePricing: any;
  setOpenedPiecePricing: any;
  isCartOpen: any;
  formData: any;
  setFormData: any;
  isSending: any;
  setIsSending: any;
}) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    setLocalStorage("cart", JSON.stringify(product));
    dispatch(setCart(product));
    setCartOpen(true);
  };
  return (
    <div className="flex flex-wrap gap-3 mt-8">
      {/* cartbtn */}
      {product.price > 0 && (
        <button
          onClick={handleAddToCart}
          className={`${
            product?.sold
              ? "text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              : cart?.find((i: any) => i.id === product.id)
              ? "text-white bg-gradient-to-r from-green-500 to-green-600 cursor-not-allowed"
              : "text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900"
          } transition-all duration-200 py-3 px-8 font-bold font-ubuntu rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70`}
          disabled={
            cart?.find((i: any) => i.id === product.id) || product?.sold
          }
        >
          {!product.sold && (
            <>
              {cart?.find((i: any) => i.id === product.id) ? (
                <div className="flex flex-row items-center">
                  <FaCheck className="text-white mr-2" />
                  Dodano do koszyka
                </div>
              ) : (
                "Dodaj do koszyka"
              )}
            </>
          )}
          {product.sold && "Obraz sprzedany"}
        </button>
      )}
      {product.price > 0 && (
        <button
          onClick={() => setCartOpen(!isCartOpen)}
          className="hover:bg-gray-800 transition-all duration-200 flex justify-center items-center group w-auto px-5 bg-gradient-to-r from-gray-900 to-black z-40 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <div className="rounded-full h-max w-auto text-white font-bold text-lg aspect-square mr-2">
            {cart?.length === 0 ? "" : cart?.length}
          </div>
          <FaShoppingCart className="text-xl text-white" />
        </button>
      )}
      {product.price === 0 && (
        <div className="w-full">
          <button
            onClick={() => {
              if (openedPiecePricing === "") {
                setOpenedPiecePricing(product.title);
              } else {
                setOpenedPiecePricing("");
              }
            }}
            className="px-5 py-3 bg-gradient-to-r from-gray-900 to-black text-white flex items-center gap-2 hover:from-gray-800 hover:to-gray-900 transition-all duration-200 rounded-xl shadow-md hover:shadow-lg font-ubuntu font-semibold active:scale-[0.98]"
          >
            <FaBell />
            Zapytaj o cenę
          </button>
          {openedPiecePricing === product.title && (
            <div
              className="mt-4 p-6 w-full bg-white z-[500] rounded-2xl shadow-xl border border-gray-200"
            >
              <div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="font-ubuntu font-semibold text-sm sm:text-base text-gray-700 mb-2">Imię:</h2>
                    <input
                      className="border border-gray-300 rounded-lg w-full p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 font-ubuntu"
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      value={formData.name}
                      placeholder="Twoje imię"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-ubuntu font-semibold text-sm sm:text-base text-gray-700 mb-2">
                      Numer telefonu:
                    </h2>
                    <input
                      className="border border-gray-300 rounded-lg w-full p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 font-ubuntu"
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      value={formData.phone}
                      placeholder="Wpisz numer"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-ubuntu mb-4">
                  Porozmawiamy o projekcie w ciągu najbliższych dwóch dni
                  roboczych.
                </p>
              </div>
              {isSending === "success" && (
                <div className="text-green-600 font-ubuntu font-semibold animate-pulse mt-3 mb-4">
                  Wysłano pomyślnie!
                </div>
              )}
              <div className="flex flex-col-reverse lg:flex-row items-center justify-end gap-3 mt-4">
                <button
                  onClick={() => setOpenedPiecePricing("")}
                  className="mt-2 lg:mt-0 px-4 py-2 text-gray-600 hover:text-gray-900 font-ubuntu transition-colors duration-200"
                >
                  Powrót
                </button>
                <button
                  disabled={isSending === "success"}
                  className="font-cardo flex flex-row items-center justify-center py-2.5 w-full sm:w-auto bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 transition-all duration-200 text-white font-bold px-6 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                  onClick={() => {
                    const id = uuidv4();
                    addDocument("leads", id, {
                      ...formData,
                      id,
                      type: "price",
                      product: product.title,
                    }).then(() => {
                      setIsSending("success");
                    });
                  }}
                >
                  Otrzymaj wycenę <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-600 mt-3 font-ubuntu leading-relaxed">
            Ten obraz nie posiada ceny. Jesteś zainteresowany kupnem tego
            dzieła? Wypełnij formularz, a ja się do Ciebie odezwę!
          </p>
        </div>
      )}
    </div>
  );
}
