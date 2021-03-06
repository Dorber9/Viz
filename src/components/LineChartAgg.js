import React from "react";
import { Card } from "react-bootstrap";

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
const cardShadow = { boxShadow: "rgb(65 62 160) 1px 1px 10px" };


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

  return (
    <>
    <div className=".pshDwn">
      <div style={{float:"left"}}>
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
        style={{background:"#a5a5a5", marginLeft:"10%" , marginTop:"20px" , boxShadow:"rgb(65 62 160) 1px 1px 10px"}}
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
      </div>
        <div style={{ float: "left", marginLeft: "140px", marginTop: "20px",width:"300px" }}>
        <Card className="card" style={cardShadow}>
          <Card.Body>
            <Card.Title>Does being aggresive leads to success?</Card.Title>

            <Card.Text>This graph shows the connection between goals scored, goals conceeded and amount of titles.
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </Card.Text>
          </Card.Body>
        </Card>

      </div>
      </div>
    </>
  );
};

export default LineChartAgg;
