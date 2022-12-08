import React, { useState } from "react";

const GlobalContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [missions, setMissions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [dashboard, setDashoard] = useState([]);
  const [singleMission, setSingleMission] = useState([]);
  const [singleTeam, setSingleTeam] = useState([]);
  const [submitConopForm, setSubmitConopForm] = useState({});
  const [query, setQuery] = useState([]);
  const [latLong, setLatLong] = useState([]);

  const ctx = {
    missions,
    setMissions,
    teams,
    setTeams,
    personnel,
    setPersonnel,
    dashboard,
    setDashoard,
    singleMission,
    setSingleMission,
    singleTeam,
    setSingleTeam,
    submitConopForm,
    setSubmitConopForm,
    query,
    setQuery,
    latLong,
    setLatLong,
  };

  return (
    <GlobalContext.Provider value={ctx}>{children}</GlobalContext.Provider>
  );
};

export { ContextProvider, GlobalContext };
