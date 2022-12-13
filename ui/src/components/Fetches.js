import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";

const Fetches = () => {
  const ctx = useContext(GlobalContext);

  const urlMissions = "http://localhost:8081/missions";
  const urlPersonnel = "http://localhost:8081/personnel";
  const urlTeams = "http://localhost:8081/teams";

  useEffect(() => {
    fetch(urlMissions)
      .then((res) => res.json())
      .then((data) => ctx.setMissions(data))
      .catch((err) => console.error(err));

    fetch(urlPersonnel)
      .then((res) => res.json())
      .then((data) => ctx.setPersonnel(data))
      .catch((err) => console.error(err));

    fetch(urlTeams)
      .then((res) => res.json())
      .then((data) => ctx.setTeams(data))
      .catch((err) => console.error(err));
  }, []);

  return <div></div>;
};






export default Fetches;
