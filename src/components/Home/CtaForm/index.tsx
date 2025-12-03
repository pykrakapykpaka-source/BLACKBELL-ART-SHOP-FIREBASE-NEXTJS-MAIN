"use client";
import { addDocument } from "@/firebase";
import { setModalVisible } from "@/redux/slices/actionSlice";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
export default function Cta({ label }: { label: string }) {
  const dispatch = useDispatch();

  function setModalVisibility(action: string) {
    dispatch(setModalVisible(action));
  }
  return (
    <button
      onClick={() => {
        const id = uuid();
        setModalVisibility("client");
        addDocument("formEngagements", id, {
          createdAt: new Date(),
          id,
        });
      }}
      className="z-20 bg-gradient-to-r from-gray-900 to-black text-white py-4 px-8 sm:py-5 sm:px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-gray-800 hover:to-gray-900 font-ubuntu font-semibold text-base sm:text-lg tracking-wide transform hover:scale-105 active:scale-100"
    >
      {label}
    </button>
  );
}
