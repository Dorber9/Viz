import React from "react";
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
} from "recharts";
import { data } from "../data/Big5Stats";

const res = data.filter((mzab) => mzab.rank == 1);
let res1 = [];
res.forEach((element) =>
  res1.hasOwnProperty(element.squad)
    ? (res1[element.squad] += element.goals_for)
    : (res1[element.squad] = element.goals_for)
);
let res2 = [];
res.forEach((element) =>
  res2.hasOwnProperty(element.squad)
    ? (res2[element.squad] += element.goals_against)
    : (res2[element.squad] = element.goals_against)
);

let titles = [];
res.forEach((element) =>
  titles.hasOwnProperty(element.squad)
    ? (titles[element.squad] += 1)
    : (titles[element.squad] = 1)
);

const convertedArray = Object.keys(res1).map((x) => {
  return {
    team: x,
    goals_for: res1[x],
    goals_against: res2[x],
    titles: titles[x],
  };
});

console.log(convertedArray);

const Test = () => {
  return (
    <BarChart width={800} height={450} data={convertedArray}>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <XAxis
        dataKey={"team"}
        textAnchor="end"
        sclaeToFit="true"
        verticalAnchor="start"
        interval={0}
        height={85}
        angle="-40"
        stroke="#8884d8"
      />
      <YAxis />
      <Bar dataKey="goals_for" fill="#00ff00">
        <LabelList
          dataKey="titles"
          position="insideRight"
          style={{ fill: "white" }}
        />
      </Bar>
      <Bar dataKey="goals_against" fill="#ff0000" />
    </BarChart>
  );
};

export default Test;

{
  /* <LineChart
width={800}
height={800}
data={res}
margin={{ top: 5, right: 10, left: 1, bottom: 5 }}
>
<XAxis dataKey="squad" />
<Tooltip />
<CartesianGrid stroke="#f5f5f5" />
<Line type="monotone" dataKey="goals_for" stroke="#ff7300" yAxisId={0} />
<Line
  type="monotone"
  dataKey="goals_against"
  stroke="#387908"
  yAxisId={1}
/>
</LineChart> */
}
