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
import React from "react";

function WalletChart({ data }) {
  // convert each value to their dollar equivalent to get the value for charts

  const pieData = () => {
    const results = [];
    const cleanData = data.filter((value) => value[1] != undefined);
    cleanData.forEach((elem) => {
      const value = elem[1].priceUsd * elem[0].value;
      if (!isNaN(value)) {
        results.push({
          name: elem[0].token.symbol,
          value: Number(value.toFixed(2)),
        });
      }
    });
    return results;
  };

  const getFillColors = React.useMemo(() => {
    let results = [];
    for (let index = 0; index < pieData().length; index++) {
      results.push(getRandomColour());
    }
    return results;
  }, []);

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
        textAnchor="middle"
        dominantBaseline="central"
      >
        {(percent * 100).toFixed(0) > 10
          ? `${(percent * 100).toFixed(0)}%`
          : ""}
      </text>
    );
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__body}>
          <ResponsiveContainer width="99%" height={120}>
            <PieChart width={120} height={120}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={pieData()}
                labelLine={false}
                cx={60}
                cy={55}
                outerRadius={50}
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getFillColors[index]} />
                ))}
              </Pie>
              <Tooltip />
              {/* <Legend layout="vertical" verticalAlign="top" align="right" /> */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default WalletChart;
