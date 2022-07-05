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
} from "recharts";
import { data } from "../data/Big5Stats";

const LineChartAgg = () => {
  var result = data.filter(
    (a) => a.cards_red != null && a.cards_yellow != null
  );

  let my_data = [];
  let counter = [];
  result.forEach((e) =>
    my_data.hasOwnProperty(e.rank)
      ? (my_data[e.rank] += e.cards_red + e.cards_yellow)
      : (my_data[e.rank] = e.cards_red + e.cards_yellow)
  );
  result.forEach((e) =>
    counter.hasOwnProperty(e.rank)
      ? (counter[e.rank] += 1)
      : (counter[e.rank] = 1)
  );

  const convertedArray = Object.keys(my_data).map((x) => {
    return {
      rank: x,
      cards: Math.round(my_data[x] / counter[x]),
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">Rank:{`${label}`}</p>

          <p className="label">Cards: {`${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  console.log(convertedArray);
  return (
    <>
      <ComposedChart
        width={800}
        height={600}
        data={convertedArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="rank"
          label={{ value: "Rank", position: "insideBottomRight", dy: 10 }}
        />
        <YAxis domain={[35, 60]}>
          <Label value="Cards" />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="cards" barSize={20} fill="#413ea0" />
        <Line
          type="monotone"
          dataKey="cards"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </ComposedChart>
    </>
  );
};

export default LineChartAgg;
