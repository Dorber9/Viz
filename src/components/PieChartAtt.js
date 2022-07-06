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
  FunnelChart,
  Funnel
} from "recharts";
import { data } from "../data/Big5Stats";
import PL from "../logos/PL.png"
import BL from "../logos/BL.png"
import LL from "../logos/LL.png"
import LONE from "../logos/LONE.png"
import SA from "../logos/SA.png"

const PieChartAtt = () => {
  const [league, setLeague] = useState("Premier League");
  const [team, setTeam] = useState("");
  const [season, setSeason] = useState("")
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
        {value}
      </text>
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

  const wins_playersued = res.filter((e) => e.squad==team).map((e, index) => {
    return{
      team: e.squad,
      season: e.season,
      wins: e.wins,
      playersused: e.players_used,
      goals: e.goals_for,
      fill: COLORS[index % COLORS.length],
    }
  })
  console.log(wins_playersued)
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name}`}</p>
        </div>
      );
    }

    return null;
  };

const league_table = data.filter((e) => e.season == season && e.competition == league).map((e, index)=>{
  return{
    team: e.squad,
    season: e.season,
    points: e.points,
    team_points: e.squad + ": " + e.points,
    fill: COLORS[index % COLORS.length]
  }
})
const seasons = res.filter((e) => e.squad == team).map((e) => {
  return{
    label: e.season,
    value: e.season
  }
})


  const setLeagueEraseTeam = (t) =>{
      setTeam("");
      setSeason("");
      setLeague(t);
  }

  return (
    <>
     <div className="icons" style={{ marginRight:"500px", marginTop:"50px", position:"relative", padding:"5px"}}>
        <img src={PL} className="logo" onClick={ () => setLeagueEraseTeam("Premier League")}></img>
        <img src={BL} className="logo" onClick={ () => setLeagueEraseTeam("Bundesliga")}></img>
        <img src={LL} className="logo" onClick={ () => setLeagueEraseTeam("La Liga")}></img>
        <img src={LONE} className="logo" onClick={ () => setLeagueEraseTeam("Ligue 1")}></img>
        <img src={SA} className="logo" onClick={ () => setLeagueEraseTeam("Serie A")}></img>
      </div>
      <div style={{position:"relative"}}>
        
      </div>
      <div style={{position:"relative"}}>
        
      </div>
      <div style={{position:"relative"}}>
        
      </div>
      {team == "" ? (
      <PieChart width={500} height={450}>
        <Tooltip content={<CustomTooltip />} />
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
          onClick ={(e) => setTeam(e.name)}
        >
          {convertedArray.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text x="100" y="40" dominantBaseline="hanging" fontSize="24" fontWeight="bold">Titles per team in {league}</text>
      </PieChart>) : ("")}

      {team != "" ? (
        <> 
        <h2 style={{textAlign:"left", marginLeft:"200px"}}>{team}</h2>
        <Select options={seasons} onChange={(e) => setSeason(e.value)}/>
        {season != "" ?(
        <FunnelChart width={730} height={500}>
        <Tooltip />
          <Funnel
    dataKey="points"
    data={league_table.sort((a, b) => b.points - a.points)}
    isAnimationActive
    >
      <LabelList position="center" fill="#ffffff" stroke="none" dataKey="team_points" />
      </Funnel>
      </FunnelChart>) : ("")}
      </>) : ("")}
    </>
  );
};

export default PieChartAtt;


