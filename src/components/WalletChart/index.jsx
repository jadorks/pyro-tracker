import style from "./wallet-chart.module.css";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getRandomColour } from "@/utils/utils";

function WalletChart() {
  // convert each value to their dollar equivalent to get the value for charts
  const data = [
    { name: "ETH", value: 200 },
    { name: "Pyro", value: 100 },
    { name: "Pyro", value: 399 },
    { name: "Pyro", value: 500 },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__body}>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart width={120} height={120}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx={60}
                cy={60}
                outerRadius={40}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRandomColour()} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default WalletChart;
