"use client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDocument, storage } from "../../../../firebase/index";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";
import { ArtworkData } from "@/types";
import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill-new"));

export const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["clean"],
];
export default function ProductEditor({
  data,
  isEdit,
  setEditOpen,
  setProducts,
}: {
  data: any;
  isEdit: boolean;
  setEditOpen?: any;
  setProducts?: any;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [artworkData, setArtworkData] = useState<any>(data);
  function add() {
    if (!artworkData.mainImage) {
      return toast.error("Proszę wybrać obrazek główny!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.category) {
      return toast.error("Proszę wybrać kategorię!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.title) {
      return toast.error("Proszę wpisać tytuł!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.description) {
      return toast.error("Proszę wpisać opis!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.tags) {
      return toast.error("Proszę wpisać minimum 1 tag!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.dimensions && artworkData.category !== "stickers") {
      return toast.error("Proszę wpisać wymiary!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    setLoading(true);
    const randId = `image-${uuid()}`;
    addDocument("products", randId, {
      ...artworkData,
      id: randId,
    }).then(() => {
      toast.success("Dodano do sklepu pomyślnie!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
      router.refresh();
    });
    setIsAdded(true);
  }
  function edit() {
    if (!artworkData.mainImage) {
      return toast.error("Proszę wybrać obrazek główny!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.category) {
      return toast.error("Proszę wybrać kategorię!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.title) {
      return toast.error("Proszę wpisać tytuł!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.description) {
      return toast.error("Proszę wpisać opis!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.tags) {
      return toast.error("Proszę wpisać minimum 1 tag!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    if (!artworkData.dimensions && artworkData.category !== "stickers") {
      return toast.error("Proszę wpisać wymiary!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    setLoading(true);
    addDocument("products", artworkData.id, artworkData).then(() => {
      toast.success("Zaktualizowano produkt pomyślnie!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setProducts((prevData: any) =>
        prevData.map((item: any) => {
          if (item.id === artworkData.id) {
            return artworkData;
          }
          return item;
        })
      );
      setLoading(false);
      router.refresh();
    });
    setEditOpen(false);
  }

  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState();
  async function upload(files: any) {
    setUploadCount(files.length);
    setUploading(true);
    const localImagesArray: any = [];
    const uploadFile = async (file: any) => {
      const randId = uuid();
      const imageRef = ref(storage, randId);
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        const data = {
          src: url,
        };
        localImagesArray.push(data);
      } catch (error) {
        return;
      }
    };

    // Iterate through each file and upload
    const uploadPromises = files.map(uploadFile);

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      setArtworkData((prevData: any) => ({
        ...prevData,
        images: [...prevData.images, ...localImagesArray],
      }));

      setLoading(false);
      setUploading(false);
    } catch (error) {
      setLoading(false);
      setUploading(false);
      return;
    }
  }
  function handleArtworkDataChange(key: keyof ArtworkData, value: any) {
    setArtworkData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  }

  return (
    <div className="font-ubuntu relative p-3 lg:p-16 bg-white min-h-screen">
      {isUploading && (
        <div className="z-[50] bg-black/70 text-white text-3xl font-light fixed left-0 top-0 w-full h-screen flex items-center justify-center text-center">
          Dodawanie {uploadCount} obrazów...
        </div>
      )}
      {isLoading && (
        <div className="z-[50] bg-black/70 text-white text-3xl font-light fixed left-0 top-0 w-full h-screen flex items-center justify-center text-center">
          Poczekaj...
        </div>
      )}
      <div className="w-full">
        <h1 className="text-2xl lg:text-4xl font-bold text-black mt-24 lg:mt-0">
          {isEdit ? "Edytujesz produkt" : "Dodajesz produkt"}
        </h1>
        <div className="p-4 bg-gray-200 w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-3 text-xl text-black">Nazwa</span>
            <input
              className={`text-zinc-700 p-2  ${
                artworkData.title
                  ? "border-2 border-green-500"
                  : "border-gray-300"
              }`}
              type="text"
              value={artworkData.title}
              onChange={(e) => handleArtworkDataChange("title", e.target.value)}
            />
          </div>
        </div>
        <div className="p-4 bg-gray-200 w-full mt-4">
          <div className="flex flex-col">
            <span className="font-bold text-xl text-black">Kategoria</span>
            <p className="text-black text-sm">Wybierz kategorię</p>
            <select
              className={`mt-1.5 font-bold text-zinc-700 p-2  ${
                artworkData.category
                  ? "border-2 border-green-500"
                  : "border-gray-300"
              }`}
              value={artworkData.category}
              onChange={(e) =>
                handleArtworkDataChange("category", e.target.value)
              }
            >
              <option value="">Wybierz kategorię</option>
              <option value="paintings">Obrazy</option>
              <option value="prints">Druki</option>
              <option value="stickers">Naklejki</option>
            </select>
          </div>
        </div>
        <div className="p-4 bg-gray-200 w-full mt-4">
          <div className="flex flex-col">
            <span className="font-bold mb-3 text-xl text-black">Opis</span>
            <ReactQuill
              placeholder=""
              className={`border-gray-300 text-black bg-white w-full`}
              value={artworkData?.description}
              onChange={(e) => {
                setArtworkData({
                  ...artworkData,
                  description: e,
                });
              }}
            />
          </div>
        </div>
        <div className="mt-4 bg-gray-200 p-4 w-full">
          <div>
            <p className="font-bold mb-3 text-xl text-black">
              {artworkData.images.length ? "Wybrane zdjęcia" : "Dodaj zdjęcia"}
            </p>
            {artworkData.images.length > 0 && !artworkData.mainImage && (
              <p className="text-black text-sm">
                Wybierz zdjęcie główne klikając na obrazek
              </p>
            )}
          </div>
          <div className="min-w-full flex flex-row flex-wrap gap-3 mt-2">
            {artworkData?.images?.map((item: any, i: any) => (
              <div key={i} className="relative h-[150px] w-auto aspect-square">
                {artworkData.mainImage === item.src && (
                  <div className="z-50 absolute bottom-0 left-0 font-light text-black bg-green-500 p-1">
                    Zdjęcie główne
                  </div>
                )}
                <Image
                  onClick={() =>
                    setArtworkData({ ...artworkData, mainImage: item.src })
                  }
                  src={item.src}
                  width={256}
                  height={256}
                  alt=""
                  className={`${
                    isLoading ? "blur-sm" : "blur-none"
                  } absolute inset-0 object-cover w-full h-full border-2 bg-slate-100 ${
                    artworkData.mainImage === item.src
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-black p-1 font-light"
                  onClick={() => {
                    setArtworkData((prevData: any) => ({
                      ...prevData,
                      images: prevData.images.filter(
                        (_: any, index: any) => index !== i
                      ),
                    }));
                  }}
                >
                  Usuń
                </button>
              </div>
            ))}
            <label
              htmlFor="fileUpload"
              className="h-[150px] aspect-square text-center flex w-max flex-col relative items-center justify-center bg-white"
            >
              <FaUpload className="text-4xl text-gray-200" />
              <span className="text-lg"></span>
            </label>
            <input
              className="hidden"
              id="fileUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={(e: any) => {
                const files = e.target.files;
                const imageFiles = Array.from(files).filter((file: any) =>
                  file.type.startsWith("image/")
                );
                upload(imageFiles);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-gray-200 w-full mt-4">
            <span className="font-bold text-xl text-black mb-3 block">
              Tagi
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem(
                  "tagInput"
                ) as HTMLInputElement;
                const newTag = input.value.trim().toLowerCase();
                if (newTag && !artworkData.tags.map((t: string) => t.toLowerCase()).includes(newTag)) {
                  setArtworkData((prevData: any) => ({
                    ...prevData,
                    tags: [...prevData.tags, newTag],
                  }));
                }
                input.value = "";
              }}
              className="flex flex-col"
            >
              <input
                type="text"
                name="tagInput"
                placeholder="Dodaj tag"
                className="text-zinc-700 p-2 border-gray-300"
              />
              <div className="flex flex-wrap gap-2 mt-2"></div>
              {artworkData?.tags?.map((tag: any, i: any) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="text-black">{tag}</span>
                  <button
                    type="button"
                    className="ml-3 text-red-500"
                    onClick={() => {
                      setArtworkData((prevData: any) => ({
                        ...prevData,
                        tags: prevData.tags.filter(
                          (_: any, index: any) => index !== i
                        ),
                      }));
                    }}
                  >
                    Usuń
                  </button>
                </div>
              ))}

              <button
                type="submit"
                className="font-light text-white bg-blue-500 py-1.5 px-3 block"
              >
                Dodaj tag
              </button>
            </form>
          </div>

          <div className="p-4 bg-gray-200 w-full mt-4">
            <div className="flex flex-col">
              <span className="font-bold text-xl text-black">Cena</span>
              <p className="text-black text-sm">
                Jeśli nie podasz ceny, pojawi się przycisk kontaktu
              </p>
              <input
                className={`mt-1.5 font-bold text-zinc-700 p-2  ${
                  artworkData.price
                    ? "border-2 border-green-500"
                    : "border-gray-300"
                }`}
                min={0}
                max={99999999}
                type="number"
                value={artworkData.price}
                onChange={(e) =>
                  handleArtworkDataChange("price", parseInt(e.target.value))
                }
              />
            </div>
          </div>
          <div className="p-4 bg-gray-200 w-full mt-4">
            <div className="flex flex-col">
              <span className="font-bold text-xl text-black">Wymiary</span>
              <p className="text-black text-sm">(100x40)</p>
              <input
                className={`mt-1.5 font-bold text-zinc-700 p-2  ${
                  artworkData.dimensions
                    ? "border-2 border-green-500"
                    : "border-gray-300"
                }`}
                type="text"
                value={artworkData.dimensions}
                onChange={(e) =>
                  handleArtworkDataChange("dimensions", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mx-auto w-max mb-4 space-x-6">
          {!isAdded && (
            <button
              disabled={isLoading}
              onClick={() => {
                if (!isEdit) {
                  add();
                } else {
                  edit();
                }
              }}
              className="font-bold px-6 bg-green-500 hover:bg-green-400 p-2 duration-200 text-white text-lg disabled:cursor-not-allowed disabled:bg-green-200"
            >
              {isLoading ? (
                "ŁADOWANIE"
              ) : (
                <>{isEdit ? "Zapisz zmiany" : "Dodaj do sklepu"}</>
              )}
            </button>
          )}
          {isEdit && (
            <button
              disabled={isLoading}
              onClick={() => {
                setEditOpen(false);
              }}
              className="font-light px-6 bg-gray-500 hover:bg-gray-400 p-2 duration-200 text-white text-lg disabled:cursor-not-allowed disabled:bg-green-200"
            >
              Wyjdź
            </button>
          )}
          {isAdded && (
            <button
              disabled={isLoading}
              onClick={() => {
                window.location.reload();
              }}
              className="px-6 bg-gray-500 hover:bg-gray-400 p-2 duration-200 text-white text-lg disabled:cursor-not-allowed disabled:bg-green-200"
            >
              Dodaj następny
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
