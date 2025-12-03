import { FaTrophy } from "react-icons/fa";

export default function Ranking({ data }: { data: any }) {
  const sortedData = [...data]
    .filter((item: any) => item?.views)
    .sort((a: any, b: any) => b.views - a.views)
    .slice(0, 3);

  return (
    <div className="mb-12 mt-6 bg-gray-100 p-3 lg:p-6">
      <h2 className="text-2xl font-cardo text-black">Ranking popularności</h2>
      <div className="mt-3 grid grid-cols-1 gap-3">
        {sortedData.map((item: any, i: any) => (
          <div key={i} className="bg-white p-3 flex flex-row">
            <div
              className={`${i === 0 && "bg-yellow-600"} ${
                i === 1 && "bg-green-600"
              } ${
                i === 2 && "bg-blue-600"
              }  h-full aspect-square flex items-center justify-center`}
            >
              <FaTrophy className="w-10 h-10 text-white" />
            </div>
            <div className="ml-2 flex flex-col">
              <h3 className="font-cardo text-black text-xl">{item.title}</h3>
              <p className="font-ubuntu text-black text-lg font-light">
                {item?.views?.toString()} wyświetleń
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
