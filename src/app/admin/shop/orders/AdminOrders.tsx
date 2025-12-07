"use client";
import { removeDocument, updateDocument } from "@/firebase";
import moment from "moment";
import "moment/locale/pl";
import { getPolishCurrency } from "../../../../../utils/getPolishCurrency";
import { 
  FaCheckCircle, 
  FaEdit, 
  FaTrash, 
  FaPhone, 
  FaEnvelope,
  FaCopy,
  FaUndo,
  FaCheck,
  FaTimes,
  FaEye,
  FaPrint
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

interface Order {
  id: string;
  creationTime: string;
  customerInfo: string;
  productName: string;
  price: number;
  finished?: boolean;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
}

const OrderCard = ({
  order,
  setOrders,
}: {
  order: Order;
  setOrders: Function;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const {
    firstName,
    lastName,
    street,
    houseNumber,
    postalCode,
    city,
    phoneNumber,
  }: CustomerInfo = JSON.parse(order.customerInfo);

  const fullAddress = `${street} ${houseNumber}, ${postalCode} ${city}`;
  const customerName = `${firstName} ${lastName}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Skopiowano ${label} do schowka!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const toggleFinished = () => {
    updateDocument(["finished"], [!order.finished], "orders", order.id).then(
      () => {
        setOrders((prevOrders: Order[]) =>
          prevOrders.map((o) =>
            o.id === order.id ? { ...o, finished: !o.finished } : o
          )
        );
        toast.success(
          order.finished
            ? "Cofnięto status zrealizowania!"
            : "Zrealizowano zamówienie pomyślnie!",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    );
  };

  const handleDelete = () => {
    removeDocument("orders", order.id).then(() => {
      setOrders((prevOrders: Order[]) =>
        prevOrders.filter((o) => o.id !== order.id)
      );
      toast.success("Usunięto zamówienie pomyślnie!", {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };

  return (
    <div
      key={order.id}
      className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 relative ${
        order.finished
          ? "border-green-500/50 bg-green-50/30"
          : "border-gray-200 hover:border-gray-300"
      } overflow-hidden`}
    >
      {/* Status Badge */}
      {order.finished && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 flex items-center gap-2">
          <FaCheckCircle className="w-5 h-5" />
          <span className="font-bold font-cardo">Zrealizowano</span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Header with Date and Status */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-xs text-gray-500 font-ubuntu mb-1">
              Data zamówienia
            </div>
            <div className="text-sm font-bold text-gray-900 font-cardo">
              {moment(order.creationTime).format("LLL")}
            </div>
          </div>
          {order.finished && (
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
              ✓
            </div>
          )}
        </div>

        {/* Customer Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-ubuntu">Klient</div>
              <div className="text-base font-bold text-gray-900 font-cardo">
                {customerName}
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(customerName, "imię klienta")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Kopiuj imię"
            >
              <FaCopy className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-ubuntu">Adres</div>
              <div className="text-sm text-gray-800 font-ubuntu">
                {fullAddress}
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(fullAddress, "adres")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Kopiuj adres"
            >
              <FaCopy className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-ubuntu">Telefon</div>
              <a
                href={`tel:${phoneNumber}`}
                className="text-base font-bold text-blue-600 hover:text-blue-800 font-cardo"
              >
                {phoneNumber}
              </a>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${phoneNumber}`}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                title="Zadzwoń"
              >
                <FaPhone className="w-4 h-4" />
              </a>
              <button
                onClick={() => copyToClipboard(phoneNumber, "telefon")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Kopiuj telefon"
              >
                <FaCopy className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="text-xs text-gray-500 font-ubuntu mb-1">Produkt</div>
          <div className="text-sm font-bold text-gray-900 font-cardo mb-2">
            {order.productName}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-ubuntu">Cena</div>
              <div className="text-lg font-bold text-gray-900 font-cardo">
                {getPolishCurrency(order.price / 100)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-6">
          <button
            onClick={toggleFinished}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-ubuntu font-medium transition-all ${
              order.finished
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {order.finished ? (
              <>
                <FaUndo className="w-4 h-4" />
                Cofnij status
              </>
            ) : (
              <>
                <FaCheck className="w-4 h-4" />
                Oznacz jako zrealizowane
              </>
            )}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-ubuntu font-medium transition-all"
          >
            <FaEye className="w-4 h-4" />
            {isExpanded ? "Zwiń" : "Szczegóły"}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-ubuntu font-medium transition-all"
          >
            <FaPrint className="w-4 h-4" />
            Drukuj
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-ubuntu font-medium transition-all"
          >
            <FaTrash className="w-4 h-4" />
            Usuń
          </button>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
            <div>
              <span className="font-bold text-gray-700">ID zamówienia:</span>{" "}
              <span className="text-gray-600 font-mono">{order.id}</span>
            </div>
            <div>
              <span className="font-bold text-gray-700">Data utworzenia:</span>{" "}
              <span className="text-gray-600">
                {moment(order.creationTime).format("LLLL")}
              </span>
            </div>
            <div>
              <span className="font-bold text-gray-700">Status:</span>{" "}
              <span
                className={`font-bold ${
                  order.finished ? "text-green-600" : "text-orange-600"
                }`}
              >
                {order.finished ? "Zrealizowane" : "W trakcie"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <div 
            className="absolute inset-0 bg-black/50 z-40 rounded-xl"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div 
              className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-cardo">
                Potwierdź usunięcie
              </h3>
              <p className="text-gray-600 mb-6 font-ubuntu">
                Czy na pewno chcesz usunąć to zamówienie? Ta operacja jest
                nieodwracalna.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-ubuntu font-medium transition-all"
                >
                  Anuluj
                </button>
                <button
                  onClick={() => {
                    handleDelete();
                    setShowDeleteConfirm(false);
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-ubuntu font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaTrash className="w-4 h-4" />
                  Usuń
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function AdminOrders({
  data,
  data2,
}: {
  data: Order[];
  data2: any;
}) {
  const [orders, setOrders] = useState(data);
  const [leads, setLeads] = useState(data2);
  const [orderFilter, setOrderFilter] = useState<"all" | "finished" | "pending">("all");
  const [leadFilter, setLeadFilter] = useState<"all" | "finished" | "pending">("all");

  const filteredOrders = orders.filter((order) => {
    if (orderFilter === "finished") return order.finished;
    if (orderFilter === "pending") return !order.finished;
    return true;
  });

  const filteredLeads = leads.filter((lead: any) => {
    if (leadFilter === "finished") return lead.finished;
    if (leadFilter === "pending") return !lead.finished;
    return true;
  });

  const ordersStats = {
    total: orders.length,
    finished: orders.filter((o) => o.finished).length,
    pending: orders.filter((o) => !o.finished).length,
  };

  const leadsStats = {
    total: leads.length,
    finished: leads.filter((l: any) => l.finished).length,
    pending: leads.filter((l: any) => !l.finished).length,
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-3 lg:px-6 pb-12">
      {/* Orders Section */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="font-cardo text-4xl font-bold mb-2 text-gray-900">
              Zamówienia
            </h2>
            <div className="flex gap-4 text-sm font-ubuntu">
              <span className="text-gray-600">
                Wszystkie: <span className="font-bold text-gray-900">{ordersStats.total}</span>
              </span>
              <span className="text-green-600">
                Zrealizowane: <span className="font-bold">{ordersStats.finished}</span>
              </span>
              <span className="text-orange-600">
                W trakcie: <span className="font-bold">{ordersStats.pending}</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setOrderFilter("all")}
              className={`px-4 py-2 rounded-lg font-ubuntu font-medium transition-all ${
                orderFilter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Wszystkie
            </button>
            <button
              onClick={() => setOrderFilter("pending")}
              className={`px-4 py-2 rounded-lg font-ubuntu font-medium transition-all ${
                orderFilter === "pending"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              W trakcie
            </button>
            <button
              onClick={() => setOrderFilter("finished")}
              className={`px-4 py-2 rounded-lg font-ubuntu font-medium transition-all ${
                orderFilter === "finished"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Zrealizowane
            </button>
          </div>
        </div>
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 font-ubuntu text-lg">
              Brak zamówień do wyświetlenia
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} setOrders={setOrders} />
            ))}
          </div>
        )}
      </div>

      {/* Leads Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="font-cardo text-4xl font-bold mb-2 text-gray-900">
              Wyceny
            </h2>
            <div className="flex gap-4 text-sm font-ubuntu">
              <span className="text-gray-600">
                Wszystkie: <span className="font-bold text-gray-900">{leadsStats.total}</span>
              </span>
              <span className="text-blue-600">
                Sprawdzone: <span className="font-bold">{leadsStats.finished}</span>
              </span>
              <span className="text-orange-600">
                Oczekujące: <span className="font-bold">{leadsStats.pending}</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLeadFilter("all")}
              className={`px-4 py-2 rounded-lg font-ubuntu font-medium transition-all ${
                leadFilter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Wszystkie
            </button>
            <button
              onClick={() => setLeadFilter("pending")}
              className={`px-4 py-2 rounded-lg font-ubuntu font-medium transition-all ${
                leadFilter === "pending"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Oczekujące
            </button>
            <button
              onClick={() => setLeadFilter("finished")}
              className={`px-4 py-2 rounded-lg font-ubuntu font-medium transition-all ${
                leadFilter === "finished"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Sprawdzone
            </button>
          </div>
        </div>
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 font-ubuntu text-lg">
              Brak wycen do wyświetlenia
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLeads.map((lead: any) => (
              <LeadCard key={lead.id} lead={lead} setLeads={setLeads} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const LeadCard = ({ lead, setLeads }: { lead: any; setLeads: Function }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Skopiowano ${label} do schowka!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const toggleFinished = () => {
    updateDocument(["finished"], [!lead.finished], "leads", lead.id).then(
      () => {
        setLeads((prevLeads: any[]) =>
          prevLeads.map((l) =>
            l.id === lead.id ? { ...l, finished: !l.finished } : l
          )
        );
        toast.success(
          lead.finished
            ? "Cofnięto status sprawdzenia!"
            : "Sprawdzono wycenę pomyślnie!",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    );
  };

  const handleDelete = () => {
    removeDocument("leads", lead.id).then(() => {
      setLeads((prevLeads: any[]) =>
        prevLeads.filter((l) => l.id !== lead.id)
      );
      toast.success("Usunięto wycenę pomyślnie!", {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };

  const leadInfo = [
    { label: "Imię", value: lead.name, copyable: true },
    { label: "Płótno", value: lead.base },
    { label: "Kolor", value: lead.color },
    { label: "Rozmiar", value: lead.size },
    { label: "Styl", value: lead.style },
    { label: "Technika", value: lead.technique },
    { label: "Telefon", value: lead.phone, copyable: true, phone: true },
  ];

  return (
    <div
      key={lead.id}
      className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 relative ${
        lead.finished
          ? "border-blue-500/50 bg-blue-50/30"
          : "border-gray-200 hover:border-gray-300"
      } overflow-hidden`}
    >
      {/* Status Badge */}
      {lead.finished && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 flex items-center gap-2">
          <FaCheckCircle className="w-5 h-5" />
          <span className="font-bold font-cardo">Sprawdzono</span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            {lead.createdAt && (
              <>
                <div className="text-xs text-gray-500 font-ubuntu mb-1">
                  Dodano
                </div>
                <div className="text-sm font-bold text-gray-900 font-cardo">
                  {moment(lead.createdAt).fromNow()}
                </div>
              </>
            )}
          </div>
          {lead.finished && (
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
              ✓
            </div>
          )}
        </div>

        {/* Lead Info */}
        <div className="space-y-3 mb-4">
          {leadInfo.map((info, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0"
            >
              <div className="flex-1">
                <div className="text-xs text-gray-500 font-ubuntu">
                  {info.label}
                </div>
                {info.phone ? (
                  <a
                    href={`tel:${info.value}`}
                    className="text-sm font-bold text-blue-600 hover:text-blue-800 font-cardo"
                  >
                    {info.value}
                  </a>
                ) : (
                  <div className="text-sm font-bold text-gray-900 font-cardo">
                    {info.value}
                  </div>
                )}
              </div>
              {info.copyable && (
                <div className="flex gap-2">
                  {info.phone && (
                    <a
                      href={`tel:${info.value}`}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      title="Zadzwoń"
                    >
                      <FaPhone className="w-3 h-3" />
                    </a>
                  )}
                  <button
                    onClick={() => copyToClipboard(info.value, info.label.toLowerCase())}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title={`Kopiuj ${info.label.toLowerCase()}`}
                  >
                    <FaCopy className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-6">
          <button
            onClick={toggleFinished}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-ubuntu font-medium transition-all ${
              lead.finished
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {lead.finished ? (
              <>
                <FaUndo className="w-4 h-4" />
                Cofnij status
              </>
            ) : (
              <>
                <FaCheck className="w-4 h-4" />
                Oznacz jako sprawdzone
              </>
            )}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-ubuntu font-medium transition-all"
          >
            <FaEye className="w-4 h-4" />
            {isExpanded ? "Zwiń" : "Szczegóły"}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-ubuntu font-medium transition-all"
          >
            <FaPrint className="w-4 h-4" />
            Drukuj
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-ubuntu font-medium transition-all"
          >
            <FaTrash className="w-4 h-4" />
            Usuń
          </button>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
            <div>
              <span className="font-bold text-gray-700">ID wyceny:</span>{" "}
              <span className="text-gray-600 font-mono">{lead.id}</span>
            </div>
            {lead.createdAt && (
              <div>
                <span className="font-bold text-gray-700">Data utworzenia:</span>{" "}
                <span className="text-gray-600">
                  {moment(lead.createdAt).format("LLLL")}
                </span>
              </div>
            )}
            <div>
              <span className="font-bold text-gray-700">Status:</span>{" "}
              <span
                className={`font-bold ${
                  lead.finished ? "text-blue-600" : "text-orange-600"
                }`}
              >
                {lead.finished ? "Sprawdzone" : "Oczekuje"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <div 
            className="absolute inset-0 bg-black/50 z-40 rounded-xl"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div 
              className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-cardo">
                Potwierdź usunięcie
              </h3>
              <p className="text-gray-600 mb-6 font-ubuntu">
                Czy na pewno chcesz usunąć tę wycenę? Ta operacja jest
                nieodwracalna.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-ubuntu font-medium transition-all"
                >
                  Anuluj
                </button>
                <button
                  onClick={() => {
                    handleDelete();
                    setShowDeleteConfirm(false);
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-ubuntu font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FaTrash className="w-4 h-4" />
                  Usuń
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
