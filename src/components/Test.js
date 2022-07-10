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
import { useEffect, useState } from "react";
import Select from "react-select";

const cardShadow = { boxShadow: "0px 0 2px rgb(255 225 140)" };


const leagues = [
  { label: "Premier League", value: "Premier League" },
  { label: "La Liga", value: "La Liga" },
  { label: "Ligue 1", value: "Ligue 1" },
  { label: "Bundesliga ", value: "Bundesliga" },
  { label: "Serie A ", value: "Serie A" },
  { label: "All", value: "All" }
];

const styles = {
  container: (base) => ({
    ...base,
    flex: 1,
    width: "250px",
    marginLeft: "50px",
  }),
};

const Test = () => {
    const [leagA, setLeagA] = useState("All");

  const res = leagA=="All"? data.filter((mzab) => mzab.rank == 1):data.filter((mzab) => mzab.rank == 1 && mzab.competition==leagA);
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
  return (
    <div className="pshDwn">
      <div style={{ float: "left" }}>
        <BarChart
          style={{
            marginLeft: "50px",
            marginTop: "15px",
            background: "black",
            boxShadow: "rgb(167 168 171) 1px 1px 10px",
          }}
          width={850}
          height={550}
          data={convertedArray}
          title="try"
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
            stroke="#413ea0"
            label={{
              value: "Team",
              position: "insideTopLeft",
              fontSize: "14px",
              dy: 5,
              dx: -30,
              stroke: "white",
              fontFamily:"auto"
            }}
          />
          <YAxis
            label={{
              value: "Goals amount",
              dy: 170,
              dx: -10,
              stroke: "white",
              angle: "90",
              fontSize:"14px",
              fontFamily:"auto"
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
      <div style={{ float: "left", marginLeft: "25px", marginTop: "25px",width:"200px" }}>
        <Card className="card" style={cardShadow}>
          <Card.Body>
            <Card.Title>What's the key for winning titles? Offence or Defence?</Card.Title>

            <Card.Text>This graph shows the connection between goals scored, goals conceeded and amount of titles won last 10 years</Card.Text>
          </Card.Body>
        </Card>
         <Select
          placeholder="Fillter by League"
          options={leagues}
          onChange={(e) => setLeagA(e.value)}
          
        />
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
