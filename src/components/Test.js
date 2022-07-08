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
import { Card } from "react-bootstrap";

const cardShadow = { boxShadow: "0px 0 2px rgb(255 225 140)" };

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
    goals_for: Math.round(res1[x] / titles[x]),
    goals_against: Math.round(res2[x] / titles[x]),
    titles: titles[x],
  };
});

console.log(convertedArray);

const Test = () => {
  return (
    <div className="pshDwn">
      <div style={{ float: "left" }}>
        <BarChart
          style={{
            marginLeft: "50px",
            marginTop: "15px",
            background: "black",
            boxShadow: "1px 1px 10px rgb(255 224 89)",
          }}
          width={850}
          height={550}
          data={convertedArray}
        >
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
            stroke="#ffe059"
            label={{
              value: "Team",
              position: "insideTopLeft",
              fontSize: "13px",
              dy: 5,
              dx: -30,
              stroke: "white",
            }}
          />
          <YAxis
            label={{
              value: "Goals amount",
              dy: 170,
              dx: -10,
              stroke: "white",
              angle: "90",
            }}
          />
          <Bar dataKey="goals_for" fill="#00ff00">
            <LabelList
              dataKey="titles"
              position="insideRight"
              style={{ fill: "white" }}
            />
          </Bar>
          <Bar dataKey="goals_against" fill="#ff0000" />
        </BarChart>
      </div>
      <div style={{ float: "left", marginLeft: "25px", marginTop: "25px" }}>
        <Card className="card" style={cardShadow}>
          <Card.Body>
            <Card.Title>What's the key for winning titles?</Card.Title>

            <Card.Text>This graph shows...</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
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
