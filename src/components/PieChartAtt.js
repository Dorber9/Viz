import React from "react";
import Select from "react-select";
import { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
  YAxis,
  LabelList,
  ResponsiveContainer,
  Legend,
  Label,
  ComposedChart,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";
import { data } from "../data/Big5Stats";

const PieChartAtt = () => {
  const [league, setleague] = useState("Premier League");
  const [season, setSeason] = useState("2010-2011");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
  const years = new Set(data.map((e) => e.season));
  const my_data = [];
  data
    .filter((e) => e.competition == league && e.season == season && e.rank < 6)
    .forEach((e) =>
      my_data.hasOwnProperty(e.squad)
        ? (my_data[e.squad] += e.goals_for + e.shots_on_target)
        : (my_data[e.squad] = e.goals_for + e.shots_on_target)
    );
  console.log(my_data);

  const convertedArray = Object.keys(my_data).map((x) => {
    return {
      team: x,
      goals_for: my_data[x],
    };
  });
  return league != "" && season != "" ? (
    <PieChart width={400} height={400}>
      <Tooltip />
      <Pie
        data={convertedArray}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="goals_for"
      >
        {convertedArray.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  ) : (
    ""
  );
};

export default PieChartAtt;
