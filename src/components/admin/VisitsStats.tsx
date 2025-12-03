"use client";
import moment from "moment";
import "moment/locale/pl";
import { FaEye, FaCalendarDay, FaCalendarAlt } from "react-icons/fa";

interface VisitStatsProps {
  pageViews: any[];
}

// Polish day names
const polishDays: { [key: number]: string } = {
  0: "Niedziela",
  1: "Poniedziałek",
  2: "Wtorek",
  3: "Środa",
  4: "Czwartek",
  5: "Piątek",
  6: "Sobota",
};

// Polish month names
const polishMonths: { [key: number]: string } = {
  0: "Styczeń",
  1: "Luty",
  2: "Marzec",
  3: "Kwiecień",
  4: "Maj",
  5: "Czerwiec",
  6: "Lipiec",
  7: "Sierpień",
  8: "Wrzesień",
  9: "Październik",
  10: "Listopad",
  11: "Grudzień",
};

export default function VisitsStats({ pageViews }: VisitStatsProps) {
  if (!pageViews || pageViews.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 mb-8 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <FaEye className="text-blue-400 text-3xl" />
          <h2 className="text-3xl font-bold text-white font-cardo">
            Statystyki odwiedzin
          </h2>
        </div>
        <p className="text-gray-400 font-ubuntu">
          Brak danych o odwiedzinach. Statystyki pojawią się po pierwszej wizycie.
        </p>
      </div>
    );
  }

  // Group visits by day
  const visitsByDay: { [key: string]: number } = {};
  const visitsByMonth: { [key: string]: number } = {};

  pageViews.forEach((visit: any) => {
    if (!visit.date) return;
    
    // Handle both timestamp and date string formats
    const date = visit.date instanceof Date 
      ? visit.date 
      : new Date(typeof visit.date === 'number' ? visit.date : visit.date);
    
    // Skip invalid dates
    if (isNaN(date.getTime())) return;
    
    const dayKey = moment(date).format("YYYY-MM-DD");
    const monthKey = moment(date).format("YYYY-MM");

    // Count by day
    visitsByDay[dayKey] = (visitsByDay[dayKey] || 0) + 1;

    // Count by month
    visitsByMonth[monthKey] = (visitsByMonth[monthKey] || 0) + 1;
  });

  // Get today's visits
  const today = moment().format("YYYY-MM-DD");
  const todayVisits = visitsByDay[today] || 0;

  // Get this month's visits
  const thisMonth = moment().format("YYYY-MM");
  const thisMonthVisits = visitsByMonth[thisMonth] || 0;

  // Get last 7 days data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = moment().subtract(i, "days");
    const dateKey = date.format("YYYY-MM-DD");
    const dayOfWeek = date.day();
    return {
      date: dateKey,
      dayName: polishDays[dayOfWeek],
      dayNumber: date.date(),
      monthName: polishMonths[date.month()],
      visits: visitsByDay[dateKey] || 0,
    };
  }).reverse();

  // Get last 12 months data
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = moment().subtract(i, "months");
    const monthKey = date.format("YYYY-MM");
    return {
      monthKey,
      monthName: polishMonths[date.month()],
      year: date.year(),
      visits: visitsByMonth[monthKey] || 0,
    };
  }).reverse();

  // Total visits
  const totalVisits = pageViews.length;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 mb-8 border border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaEye className="text-blue-400 text-3xl" />
        <h2 className="text-3xl font-bold text-white font-cardo">
          Statystyki odwiedzin
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-700/50 rounded-lg p-5 border border-gray-600">
          <div className="flex items-center gap-3 mb-2">
            <FaCalendarDay className="text-green-400 text-xl" />
            <span className="text-gray-400 text-sm font-ubuntu">Dzisiaj</span>
          </div>
          <div className="text-3xl font-bold text-white font-cardo">
            {todayVisits}
          </div>
          <div className="text-xs text-gray-400 mt-1 font-ubuntu">
            {moment().format("DD MMMM YYYY")}
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-5 border border-gray-600">
          <div className="flex items-center gap-3 mb-2">
            <FaCalendarAlt className="text-blue-400 text-xl" />
            <span className="text-gray-400 text-sm font-ubuntu">
              Ten miesiąc
            </span>
          </div>
          <div className="text-3xl font-bold text-white font-cardo">
            {thisMonthVisits}
          </div>
          <div className="text-xs text-gray-400 mt-1 font-ubuntu">
            {polishMonths[moment().month()]} {moment().year()}
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-5 border border-gray-600">
          <div className="flex items-center gap-3 mb-2">
            <FaEye className="text-purple-400 text-xl" />
            <span className="text-gray-400 text-sm font-ubuntu">Wszystkie</span>
          </div>
          <div className="text-3xl font-bold text-white font-cardo">
            {totalVisits}
          </div>
          <div className="text-xs text-gray-400 mt-1 font-ubuntu">
            Łączna liczba wizyt
          </div>
        </div>
      </div>

      {/* Last 7 Days */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4 font-cardo">
          Ostatnie 7 dni
        </h3>
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
          <div className="grid grid-cols-7 gap-2">
            {last7Days.map((day, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-600 text-center"
              >
                <div className="text-xs text-gray-400 font-ubuntu mb-1">
                  {day.dayName}
                </div>
                <div className="text-lg font-bold text-white font-cardo mb-1">
                  {day.visits}
                </div>
                <div className="text-xs text-gray-500 font-ubuntu">
                  {day.dayNumber} {day.monthName.slice(0, 3)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last 12 Months */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 font-cardo">
          Ostatnie 12 miesięcy
        </h3>
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {last12Months.map((month, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-600"
              >
                <div className="text-sm text-gray-400 font-ubuntu mb-1">
                  {month.monthName} {month.year}
                </div>
                <div className="text-2xl font-bold text-white font-cardo">
                  {month.visits}
                </div>
                <div className="text-xs text-gray-500 font-ubuntu mt-1">
                  wizyt
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

