//import components and styling
import "../styling/app.css";
import { Routes, Route } from "react-router-dom";

//import pages
import Dashboard from "./Dashboard";
import Missions from "./Missions";
import Personnel from "./Personnel";
import Teams from "./Teams";
import SingleMission from "./SingleMission";
import SingleTeam from "./SingleTeam";
import SubmitConop from "./SubmitConop";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/missions/:missionid" element={<SingleMission />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamid" element={<SingleTeam />} />
        <Route path="/personnel" element={<Personnel />} />
        <Route path="/personnel/:personid" />
        <Route path="/conop" element={<SubmitConop />} />
      </Routes>
    </div>
  );
}

export default App;
