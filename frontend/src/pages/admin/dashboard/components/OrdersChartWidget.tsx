import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { AdminDashboardData } from "../types";
import { CustomTooltip } from "../../../../utils/recharts/customTooltip";

type Props = {
  data: AdminDashboardData;
};

export default function OrdersChartWidget({ data }: Props) {

  const line = data.timeseries;

  console.log("line :", line)

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title-warning">
        Activité des 7 derniers jours
      </div>

      <div className="dashboard-content pt-2 pb-0">
        <div className="flex flex-row justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={line}>
              <XAxis dataKey="date" />
              <Tooltip content={CustomTooltip} defaultIndex={1} />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="orders" stroke="#98B66E" />
              <Line type="monotone" dataKey="revenue" stroke="#0081A7" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      

    </div>
  );
}