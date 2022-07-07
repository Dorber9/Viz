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

const ez = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

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
      <Select
        styles={styles}
        options={all_seasons}
        onChange={(e) => changeSeason(e.value)}
      ></Select>
      {season == "" ? (
        ""
      ) : (
        <Select
          styles={styles}
          options={leagues}
          onChange={(e) => changeLeagA(e.value)}
        />
      )}
      {leagA == "" ? (
        ""
      ) : (
        <Select
          styles={styles}
          options={teamsA}
          onChange={(e) => setTeamA(e.value)}
        ></Select>
      )}
      {teamA == "" ? (
        ""
      ) : (
        <Select
          styles={styles}
          options={leagues}
          onChange={(e) => changeLeagB(e.value)}
        ></Select>
      )}
      {leagB == "" ? (
        ""
      ) : (
        <Select
          styles={styles}
          options={teamsB}
          onChange={(e) => setTeamB(e.value)}
        ></Select>
      )}

      {teamA == "" || teamB == "" ? (
        ""
      ) : (
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={500}
          height={500}
          data={data_to_use}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="Subject" />
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
    </>
  );
};

export default RadarChartTwoTeams;
