"use client";
import moment from "moment";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts";

export default function VisitsChart({ pageViews }: { pageViews: any }) {
  function generateLeadsChartData(data: any, key: string) {
    // Find unique day names from leads
    const uniqueDays = new Set(
      data.map((lead: any) => moment(lead.date).format("DD.MM.YYYY"))
    );
    const uniqueDayNames = Array.from(uniqueDays).sort();

    // {'01.06.2024', '02.06.2024'}
    const chartData = uniqueDayNames.map((day: any) => ({
      dzien: day,
      [key]: data.filter(
        (lead: any) => moment(lead.date).format("DD.MM.YYYY") === day
      ).length,
    }));

    return chartData;
  }

  return (
    <>
      <h2 className="text-2xl font-cardo text-black mb-3">Wizyty na stronie</h2>
      <div className="bg-green-100 p-4">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={generateLeadsChartData(pageViews, "Odwiedziny")}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dzien" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Odwiedziny" stroke="green" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
