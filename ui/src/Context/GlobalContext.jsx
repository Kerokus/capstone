import React, { useState } from "react";

const GlobalContext = React.createContext();

const ContextProvider = ({ children }) => {
  // Search Functionality States:
  const [searchTerm, setSearchTerm] = useState(""); //Mission; Personnel; Teams
  const [filteredData, setFilteredData] = useState([]); //Mission; Personnel; Teams
  const [refresh, setRefresh] = useState(false); //Mission; Personnel; Teams
  const [show, setShow] = useState(false); //Mission; Personnel; Teams
  const [formData, setFormData] = useState({}); //Mission; Personnel; Teams
  const [validated, setValidated] = useState(false); //Mission; Personnel; Teams
  const [query, setQuery] = useState([]);

  // <- <- App
  const [clickedMission, setClickedMission] = useState(null); // Missions;
  const [clickedTeam, setClickedTeam] = useState(null); // Teams;

  // <- <- Archives
  const [displayedEntity, setDisplayedEntity] = useState('Missions');

  // <- <- Dashboard
  const [dashboard, setDashboard] = useState([]);
  const [oneDayDate, setOneDayDate] = useState("");
  const [twoDayDate, setTwoDayDate] = useState("");

  // <- <- Map Markers
  const [dashboardMarkers, setDashboardMarkers] = useState([]);
  const [teamMarkers, setTeamMarkers] = useState([]);
  const [missionMarkers, setMissionMarkers] = useState([]);

  // <- <- Dashboard - Team Statuses
  // CI Teams State
  const [ciTeams, setCiTeams] = useState([]);
  const [greenCiTeams, setGreenCiTeams] = useState([]);
  const [yellowCiTeams, setYellowCiTeams] = useState([]);
  const [redCiTeams, setRedCiTeams] = useState([]);
  // HUMINT Teams State
  const [humintTeams, setHumintTeams] = useState([]);
  const [greenHumintTeams, setGreenHumintTeams] = useState([]);
  const [yellowHumintTeams, setYellowHumintTeams] = useState([]);
  const [redHumintTeams, setRedHumintTeams] = useState([]);
  // SIGINT Teams State
  const [sigintTeams, setSigintTeams] = useState([]);
  const [greenSigintTeams, setGreenSigintTeams] = useState([]);
  const [yellowSigintTeams, setYellowSigintTeams] = useState([]);
  const [redSigintTeams, setRedSigintTeams] = useState([]);

  // <- <- Missions
  const [missionData, setMissionData] = useState([]); //Missions; Teams
  const [missions, setMissions] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [singleMission, setSingleMission] = useState([]);
  const [latLong, setLatLong] = useState([]);
  const [upcomingMissions, setUpcomingMissions] = useState([]);

  // <- <- Personnel
  const [showWarning, setShowWarning] = useState(false);
  const [deleteValue, setDeleteValue] = useState();
  const [personnelData, setPersonnelData] = useState([
    {
      id: "",
      first_name: "",
      last_name: "",
      rank: "",
      mos: "",
      email: "",
      status: "",
      team_name: "",
      city_base: "",
      country: "",
      deployment_start: "",
      deployment_end: "",
    },
  ]); //Teams;
  const [isAdd, setIsAdd] = useState(false);
  const [teams, setTeams] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  //const { clickedTeam, setClickedTeam } = useContext(TeamContext) <-see line 26

  // <- <- Teams
  const [teamData, setTeamData] = useState([]); //Missions
  const [singleTeam, setSingleTeam] = useState([]);
  //const { clickedTeam, setClickedTeam } = useContext(TeamContext) <- see line 8

  // <- <- Submit Conop Contexts
  const [submitConopForm, setSubmitConopForm] = useState({});
  const [conopSubmitValidated, setConopSubmitValidated] = useState(false);

  // <- <- Map Contexts
  const [center, setCenter] = useState({lat: 28.871513, lng: 48.163907});


  const ctx = {
    searchTerm,
    setSearchTerm,
    filteredData,
    setFilteredData,
    refresh,
    setRefresh,
    show,
    setShow,
    formData,
    setFormData,
    validated,
    setValidated,
    query,
    setQuery,
    clickedMission,
    setClickedMission,
    clickedTeam,
    setClickedTeam,
    dashboard,
    setDashboard,
    missionData,
    setMissionData,
    missions,
    setMissions,
    showDelete,
    setShowDelete,
    singleMission,
    setSingleMission,
    latLong,
    setLatLong,
    showWarning,
    setShowWarning,
    deleteValue,
    setDeleteValue,
    personnelData,
    setPersonnelData,
    isAdd,
    setIsAdd,
    teams,
    setTeams,
    personnel,
    setPersonnel,
    teamData,
    setTeamData,
    singleTeam,
    setSingleTeam,
    submitConopForm,
    setSubmitConopForm,
    conopSubmitValidated,
    setConopSubmitValidated,
    ciTeams,
    setCiTeams,
    greenCiTeams,
    setGreenCiTeams,
    yellowCiTeams,
    setYellowCiTeams,
    redCiTeams,
    setRedCiTeams,
    humintTeams,
    setHumintTeams,
    greenHumintTeams,
    setGreenHumintTeams,
    yellowHumintTeams,
    setYellowHumintTeams,
    redHumintTeams,
    setRedHumintTeams,
    sigintTeams,
    setSigintTeams,
    greenSigintTeams,
    setGreenSigintTeams,
    yellowSigintTeams,
    setYellowSigintTeams,
    redSigintTeams,
    setRedSigintTeams,
    oneDayDate,
    setOneDayDate,
    twoDayDate,
    setTwoDayDate,
    center,
    setCenter,
    teamMarkers,
    setTeamMarkers, 
    dashboardMarkers,
    setDashboardMarkers, 
    missionMarkers,
    setMissionMarkers,
    upcomingMissions,
    setUpcomingMissions,
    displayedEntity,
    setDisplayedEntity
  };

  return (
    <GlobalContext.Provider value={ctx}>{children}</GlobalContext.Provider>
  );
};

export { ContextProvider, GlobalContext };
