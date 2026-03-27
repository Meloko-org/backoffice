import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData;
};

export default function OrdersChartWidget({ data }: Props) {

  const line = data.timeseries;

  console.log("line :", line)

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title">
        Activité des 7 derniers jours
      </div>

      <div className="dashboard-content">
        <LineChart width={400} height={400} data={line}>
          <XAxis dataKey="date" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="orders" stroke="#98B66E" />
          <Line type="monotone" dataKey="revenue" stroke="#0081A7" />
        </LineChart>
      </div>
      

    </div>
  );
}