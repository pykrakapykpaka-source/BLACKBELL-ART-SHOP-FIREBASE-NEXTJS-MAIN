"use client";
import logo from "../../../../public/images/logoWhite.png";
import Image from "next/image";
import ClientFormLogic from "./ClientFormLogic";

export default function ClientForm({
  action,
  setAction,
}: {
  action: string;
  setAction: Function;
}) {
  return (
    <div
      className={`z-[1600] left-0 top-0 fixed w-full h-full ${
        action === "client" ? "translate-x-0" : "-translate-x-[400vw]"
      }`}
    >
      <div
        onClick={() => setAction(undefined)}
        className={`w-full h-full bg-black/70 duration-500`}
      >
        <div
          onClick={(e: any) => e.stopPropagation()}
          className={`${
            action === "client"
              ? "fixed -translate-y-0"
              : "-translate-y-[100vh]"
          } duration-500 delay-500 left-1/2 -translate-x-1/2 top-0 w-[85vw] lg:max-w-[70vw] xl:max-w-[60vw] h-max bg-white overflow-y-scroll max-h-[80vh]`}
        >
          <div className="bg-gray-800 p-6 flex flex-col lg:flex-row xl:sticky z-10 top-0 left-0">
            <div className="w-max flex flex-row lg:flex-col items-center justify-center lg:pr-8">
              <Image
                src={logo}
                width={250}
                height={125}
                alt=""
                className="max-w-[50px] lg:max-w-[80px] h-auto"
              />
              <p className="w-max text-white font-bold text-left lg:text-center lg:pl-0 lg:mt-2 pl-4">
                Blackbell Art <br /> Studio
              </p>
            </div>
            <div className="lg:px-3 mt-4 lg:mt-0">
              <h2 className="text-xl md:text-2xl lg:text-3xl text-left xl:text-4xl font-bold text-white font-cardo">
                Porozmawiajmy o Twoim obrazie na zamówienie
              </h2>
              <p className="text-sm sm:text-justify mt-4 mx-auto text-gray-200">
                Dzięki podanym informacjom będę mogła dostosować ofertę do
                twojej wizji :)
              </p>
            </div>
          </div>
          <div className="w-full text-zinc-800">
            <ClientFormLogic />
          </div>
        </div>
      </div>
    </div>
  );
}
