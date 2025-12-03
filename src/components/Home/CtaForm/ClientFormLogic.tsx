"use client";
import { addDocument } from "@/firebase";
import { setModalVisible } from "@/redux/slices/actionSlice";
import React, { useState } from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
export default function ClientFormLogic() {
  const [formData, setFormData] = useState<any>({
    style: undefined,
    size: undefined,
    technique: undefined,
    color: undefined,
    base: undefined,
    phone: "",
    name: "",
  });
  const [isSending, setIsSending] = useState<any>(undefined);
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    setIsSending(true);
    e.preventDefault();
  };
  return (
    <>
      <div className="z-0 relative">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
            <span className="font-bold text-lg">
              {formData.style !== undefined && (
                <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                  <FaCheckCircle />
                </div>
              )}
              Wybierz styl obrazu
            </span>
            <div className="-ml-2 flex flex-row flex-wrap">
              {[
                "Abstrakcja",
                "Contemporary art",
                "Reprodukcja dzieła sztuki",
                "Minimalistyczny",
                "Realistyczny",
                "Realizm magiczny",
                "Inny",
              ].map((style) => (
                <button
                  key={style}
                  onClick={() => setFormData({ ...formData, style })}
                  className={`${
                    formData.style === style
                      ? "border-black"
                      : "border-green-500"
                  } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
            <span className="font-bold text-lg">
              {formData.size !== undefined && (
                <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                  <FaCheckCircle />
                </div>
              )}
              Wybierz rozmiar obrazu
            </span>
            <div className="-ml-2 flex flex-row flex-wrap">
              {["Mały", "Średni", "Duży", "Bardzo duży"].map((size) => (
                <button
                  key={size}
                  onClick={() => setFormData({ ...formData, size })}
                  className={`${
                    formData.size === size ? "border-black" : "border-green-500"
                  } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
            <span className="font-bold text-lg">
              {formData.technique !== undefined && (
                <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                  <FaCheckCircle />
                </div>
              )}
              Wybierz technikę
            </span>
            <div className="-ml-2 flex flex-row flex-wrap">
              {[
                "Farby akrylowe",
                "Farby olejne",
                "Akwarele",
                "Kredki",
                "Ołówek",
                "Inna",
              ].map((technique) => (
                <button
                  key={technique}
                  onClick={() => setFormData({ ...formData, technique })}
                  className={`${
                    formData.technique === technique
                      ? "border-black"
                      : "border-green-500"
                  } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                >
                  {technique}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
            <span className="font-bold text-lg">
              {formData.color !== undefined && (
                <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                  <FaCheckCircle />
                </div>
              )}
              Wybierz kolorystykę
            </span>
            <div className="-ml-2 flex flex-row flex-wrap">
              {[
                "Czarno-biały",
                "Kolorowy",
                "Realistyczne kolory",
                "Moja inwencja twórcza",
                "Monochromatyczne",
                "Inny",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={`${
                    formData.color === color
                      ? "border-black"
                      : "border-green-500"
                  } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-green-500 py-6 px-6 relative">
            <span className="font-bold text-lg">
              {formData.base !== undefined && (
                <div className="text-2xl absolute left-2 top-4 -translate-y-1/2 text-green-500">
                  <FaCheckCircle />
                </div>
              )}
              Wybierz podłoże malarskie
            </span>
            <div className="-ml-2 flex flex-row flex-wrap">
              {[
                "Kartka papieru",
                "Płótno bawełniane",
                "Płótno lniane",
                "Podobrazie płytowe",
                "Podobrazie drewniane",
                "Inny",
              ].map((base) => (
                <button
                  key={base}
                  onClick={() => setFormData({ ...formData, base })}
                  className={`${
                    formData.base === base ? "border-black" : "border-green-500"
                  } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                >
                  {base}
                </button>
              ))}
            </div>
          </div>
        </form>
        {formData.color &&
          formData.size &&
          formData.technique &&
          formData.style &&
          formData.base && (
            <div
              style={{ boxShadow: "0px 0px 3px black" }}
              className="absolute bottom-0 left-0 p-6 w-full bg-white z-[500]"
            >
              <div>
                <div className="flex gap-3">
                  <div>
                    <h2 className="font-bold text-sm sm:text-base">Imię:</h2>
                    <input
                      className="border border-gray-400 w-full sm:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500 mb-1"
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      value={formData.name}
                      placeholder="Twoje imię"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm sm:text-base">
                      Numer telefonu:
                    </h2>
                    <input
                      className="border border-gray-400 w-full sm:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500"
                      type="text"
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      value={formData.phone}
                      placeholder="Wpisz numer"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Porozmawiamy o projekcie w ciągu najbliższych dwóch dni
                  roboczych.
                </p>
              </div>
              {isSending === "success" && (
                <div className="text-green-500 animate-pulse mt-3">
                  Wysłano pomyślnie!
                </div>
              )}
              <div className="flex flex-col-reverse lg:flex-row items-center w-full mt-2">
                <button
                  onClick={() => setFormData({ ...formData, base: undefined })}
                  className="mt-2 lg:mr-4"
                >
                  Powrót
                </button>
                <button
                  disabled={isSending === "success"}
                  onClick={() => {
                    if (formData.phone.length > 8 && formData.name.length > 2) {
                      const id = uuidv4();
                      addDocument("leads", id, {
                        ...formData,
                        id,
                        createdAt: Date.now(),
                      }).then(() => {
                        setIsSending("success");
                        toast.success("Pomyślnie wysłano zapytanie!", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                        });
                        setTimeout(() => {
                          dispatch(setModalVisible(undefined));
                        }, 5000);
                      });
                    } else {
                      toast.error(
                        "Wypełnij poprawnie wszystkie pola formularza!",
                        {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                        }
                      );
                    }
                  }}
                  className="font-cardo flex flex-row items-center justify-center py-2 w-full text-base sm:w-max bg-black hover:bg-gray-800 duration-200 text-white font-bold mt-2 px-4"
                >
                  Otrzymaj wycenę <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          )}
      </div>
    </>
  );
}
