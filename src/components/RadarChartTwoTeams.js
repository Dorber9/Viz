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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
} from "recharts";

import { data } from "../data/Big5Stats";



const styles = {
  container: (base) => ({
    ...base,
    flex: 1,
    width: "250px",
    marginLeft: "50px",
  }),
};

const leagues = [
  { label: "Premier League", value: "Premier League" },
  { label: "La Liga", value: "La Liga" },
  { label: "Ligue 1", value: "Ligue 1" },
  { label: "Bundesliga ", value: "Bundesliga" },
  { label: "Serie A ", value: "Serie A" },
];

const RadarChartTwoTeams = () => {
  const [leagA, setLeagA] = useState("");
  const [leagB, setLeagB] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [season, setSeason] = useState("");

  const all_seasons = Array.from(new Set(data.map((e) => e.season))).map(
    (e) => {
      return { label: e, value: e };
    }
  );

  const changeLeagA = (e) => {
    setLeagA(e);
    setTeamA("");
  };
  const changeLeagB = (e) => {
    setLeagB(e);
    setTeamB("");
  };

  const changeSeason = (e) => {
    setSeason(e);
    changeLeagA("");
    changeLeagB("");
  };

  const teamsA = Array.from(
    new Set(
      data
        .filter((e) => e.competition == leagA && e.season == season)
        .map((e) => e.squad)
    )
  ).map((e) => {
    return { label: e, value: e };
  });

  const teamsB = Array.from(
    new Set(
      data
        .filter((e) => e.competition == leagB && e.season == season)
        .map((e) => e.squad)
    )
  ).map((e) => {
    return { label: e, value: e };
  });

  const data_to_use = [];
  if (teamA != "" && teamB != "") {
    const my_data = data.filter((e) => e.squad == teamA);
    const my_data1 = data.filter((e) => e.squad == teamB);
    for (const key in my_data[0]) {
      if (
        key == "goals_for" ||
        key == "assists" ||
        key == "goal_diff" ||
        key == "clean_sheets" ||
        key == "players_used" ||
        key == "points"
      ) {
        data_to_use.push({
          Subject: key,
          A: my_data[0][key],
          B: my_data1[0][key],
        });
      }
    }
  }

  console.log(data_to_use);

  return (
    <>
    <div className="pshDwn">
      <div style={{marginLeft:"38%" , marginTop:"10px"}}>
      <Select
        placeholder="Select Season"
        styles={styles}
        options={all_seasons}
        onChange={(e) => changeSeason(e.value)}
      ></Select>
      </div>
      {season == "" ? (
        ""
      ) : (
        <div style={{marginLeft:"25%" , marginTop:"10px"}}>
        <Select
          placeholder="Select First Team League"
          styles={styles}
          options={leagues}
          onChange={(e) => changeLeagA(e.value)}
          
        />
        </div>
        
      )}
      {leagA == "" ? (
        ""
      ) : (
     <div style={{marginLeft:"25%" , marginTop:"10px"}}>
        <Select
          placeholder="Select First Team"
          styles={styles}
          options={teamsA}
          onChange={(e) => setTeamA(e.value)}
        ></Select>
        </div>
      )}
      {teamA == "" ? (
        ""
      ) : (
             <div style={{marginLeft:"51%" , marginTop:"-85px"}}>
        <Select
         placeholder="Select Second Team League"
          styles={styles}
          options={leagues}
          onChange={(e) => changeLeagB(e.value)}
        ></Select>
        </div>
      )}
      {leagB == "" ? (
        ""
      ) : (
                     <div style={{marginLeft:"51%" , marginTop:"10px"}}>

        <Select
                 placeholder="Select Second Team"
          styles={styles}
          options={teamsB}
          onChange={(e) => setTeamB(e.value)}
        ></Select>
        </div>
      )}

      {teamA == "" || teamB == "" ? (
        ""
      ) : (
        <RadarChart
        style={{marginLeft:"30%", marginTop:"15px" , background:"black", boxShadow:"rgb(165 166 169) 1px 1px 10px"}}
          cx={300}
          cy={250}
          outerRadius={150}
          width={600}
          height={500}
          data={data_to_use}
        >
          <PolarGrid />
          <Tooltip/>
          <PolarAngleAxis dataKey="Subject" stroke="#8884d8" />
          <PolarRadiusAxis angle={30} domain={[0, 105]} />
          <Radar
            name={teamA}
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name={teamB}
            dataKey="B"
            stroke="#ff1a1a"
            fill="#ff1a1a"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
        
      )}
      </div>
    </>
  );
};

export default RadarChartTwoTeams;
