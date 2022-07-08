import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";


import Test from "./components/Test";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import RadarChartTwoTeams from "./components/RadarChartTwoTeams";
import LineChartAgg from "./components/LineChartAgg";
import PieChartAtt from "./components/PieChartAtt";

function App() {
  return (
    <>
    <div className="App">
      <Header />
      <BrowserRouter>
      <Routes>
       <Route exact path="/" element={<HomePage />}></Route>
       <Route exact path="/offvsdef" element={<Test />}></Route>
       <Route exact path="/teamcompare" element={<RadarChartTwoTeams />}></Route>
        <Route exact path="/aggvsrank" element={<LineChartAgg />}></Route>
        <Route exact path="/leagchamps" element={<PieChartAtt />}></Route>

       </Routes>
       </BrowserRouter>
    </div>
    
    
    </>
  );
}

export default App;
