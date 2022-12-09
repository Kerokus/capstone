//import components and styling
import "../styling/app.css";
import { ContextProvider} from "../Context/GlobalContext";
import { Routes, Route } from "react-router-dom";

//import pages
import Fetches from "../components/Fetches";
import Dashboard from "./Dashboard";
import Missions from "./Missions";
import Personnel from "./Personnel";
import Teams from "./Teams";
import SingleMission from "./SingleMission";
import SingleTeam from "./SingleTeam";
import SubmitConop from "./SubmitConop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MissionCss from "./MissionCss";
import TeamsCss from "./TeamsCss";


function App() {
  return (
    <>
    <ContextProvider>
      <Fetches/>
     < Navbar/>
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
        <Route path="/missionscss" element={<MissionCss />} />
        <Route path="/teamscss" element={<TeamsCss />} />
      </Routes>
      <Footer/>
    </div>
    </ContextProvider>
    </>
  );
}

export default App;
