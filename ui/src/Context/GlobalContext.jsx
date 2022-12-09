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
  const [clickedTeam, setClickedTeam] = useState(null);

  // <- <- Dashboard
  const [dashboard, setDashoard] = useState([]);

  // <- <- Missions
  const [missionData, setMissionData] = useState([]); //Missions; Teams
  const [missions, setMissions] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [singleMission, setSingleMission] = useState([]);
  const [latLong, setLatLong] = useState([]);

  // <- <- Personnel
  const [showWarning, setShowWarning] = useState(false);
  const [deleteValue, setDeleteValue] = useState("");
  const [personnelData, setPersonnelData] = useState([]); //Teams;
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
    setDashoard,
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
  };

  return (
    <GlobalContext.Provider value={ctx}>{children}</GlobalContext.Provider>
  );
};

export { ContextProvider, GlobalContext };
