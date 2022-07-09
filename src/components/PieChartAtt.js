import React from "react";
import Select from "react-select";
import { useEffect, useState, useCallback } from "react";
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
  FunnelChart,
  Funnel,
} from "recharts";
import { data } from "../data/Big5Stats";
import PL from "../logos/PL.png";
import BL from "../logos/BL.png";
import LL from "../logos/LL.png";
import LONE from "../logos/LONE.png";
import SA from "../logos/SA.png";

const styles = {
  container: (base) => ({
    ...base,
    flex: 1,
    width: "250px",
    marginLeft: "50px",
  }),
};

const PieChartAtt = () => {
  const [league, setLeague] = useState("Premier League");
  const [team, setTeam] = useState("");
  const [season, setSeason] = useState("");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#e60000"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    value,
    name,
    fill,
  }) => {
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y}
          fill={fill}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {name}: {value}{" "}
        </text>{" "}
      </>
    );
  };

  const my_data = [];
  const res = data.filter(
    (mzab) => mzab.rank == 1 && mzab.competition == league
  );
  res.forEach((e) =>
    my_data.hasOwnProperty(e.squad)
      ? (my_data[e.squad] += 1)
      : (my_data[e.squad] = 1)
  );
  console.log(my_data);

  const convertedArray = Object.keys(my_data).map((x) => {
    return {
      team: x,
      titles: my_data[x],
    };
  });

  const wins_playersued = res
    .filter((e) => e.squad == team)
    .map((e, index) => {
      return {
        team: e.squad,
        season: e.season,
        wins: e.wins,
        playersused: e.players_used,
        goals: e.goals_for,
        fill: COLORS[index % COLORS.length],
      };
    });
  console.log(wins_playersued);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label"> {`${payload[0].name}`} </p>{" "}
        </div>
      );
    }

    return null;
  };

  const league_table = data
    .filter((e) => e.season == season && e.competition == league)
    .map((e, index) => {
      return {
        team: e.squad,
        season: e.season,
        points: e.points,
        team_points: e.squad + ": " + e.points,
        fill:
          e.rank > 17 || e.notes == "Relegated"
            ? COLORS[4]
            : e.rank < 6
            ? COLORS[1]
            : e.rank > 5 && e.rank < 11
            ? COLORS[2]
            : COLORS[3],
      };
    });
  const seasons = res
    .filter((e) => e.squad == team)
    .map((e) => {
      return {
        label: e.season,
        value: e.season,
      };
    });

  const setLeagueEraseTeam = (t) => {
    setTeam("");
    setSeason("");
    setLeague(t);
  };

  const renderLabel = useCallback((piePiece) => {
    return piePiece.name;
  }, []);

  return (
    <>
    <div className="pshDwn">
      <div
        className="icons"
        style={{
          marginTop: "50px",
             background: "rgb(255 255 255 / 59%)",
    borderRadius: "50%",
    boxShadow:"-8px 3px 7px 3px #b9fffa80"
        }}
      >

          <img
            src={PL}
            className={league=="Premier League"? "logoSelected": "logo"}
            onClick={() => setLeagueEraseTeam("Premier League")}
          ></img>
          <img
            src={BL}
            className={league=="Bundesliga"? "logoSelected": "logo"}
            onClick={() => setLeagueEraseTeam("Bundesliga")}
          ></img>
          <img
            src={LL}
            className={league=="La Liga"? "logoSelected": "logo"}
            onClick={() => setLeagueEraseTeam("La Liga")}
          ></img>
          <img
            src={LONE}
                        className={league=="Ligue 1"? "logoSelected": "logo"}

            onClick={() => setLeagueEraseTeam("Ligue 1")}
          ></img>
          <img
            src={SA}
                        className={league=="Serie A"? "logoSelected": "logo"}

            onClick={() => setLeagueEraseTeam("Serie A")}
          ></img>
        
      </div>
      {team == "" ? (

        <PieChart
          width={500}
          height={450}
  
                        style={{background: "#cfcfcf7a" , boxShadow: "-1px 4px 6px #0034ff" , marginTop:"25px" , marginLeft:"500px"}}
        >
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Pie
   
            data={convertedArray}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="titles"
            nameKey="team"
            style={{cursor:"pointer"}}
            onClick={(e) => setTeam(e.name)}
          >
            {convertedArray.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <text
            x="100"
            y="40"
            dominantBaseline="hanging"
            fontSize="24"
            fontWeight="bold"
          >
            Titles per team in {league}
          </text>
        </PieChart>
      ) : (
        ""
      )}
      {team != "" ? (
        <>
          <h2 style={{ textAlign: "left", marginLeft: "200px" }}>
            {" "}
            {team}
            's Championships. Choose a season{" "}
          </h2>{" "}
          <Select
            options={seasons}
            styles={styles}
            onChange={(e) => setSeason(e.value)}
          />{" "}
          {season != "" ? (
            <>
              <div className="Top"> Top 5 </div>{" "}
              <div className="mid"> Mid - Table </div>{" "}
              <div className="bottom"> Bottom </div>{" "}
              <div className="relegation"> Relegated </div>
              <FunnelChart width={850} height={580}>
                <Funnel
                  dataKey="points"
                  data={league_table.sort((a, b) => b.points - a.points)}
                  isAnimationActive
                >
                  <LabelList
                    position="center"
                    fill="#ffffff"
                    stroke="none"
                    dataKey="team_points"
                  />
                </Funnel>{" "}
              </FunnelChart>{" "}
            </>
          ) : (
            ""
          )}{" "}
        </>
      ) : (
        ""
      )}{" "}
      </div>
    </>
  );
};

export default PieChartAtt;
