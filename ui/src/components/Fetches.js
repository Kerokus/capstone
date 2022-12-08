import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";

const Fetches = () => {
  const ctx = useContext(GlobalContext)  

  
  const urlMissions = "https://swapi.dev/api/planets/";
  const urlPersonnel= "https://swapi.dev/api/people/";
  const urlTeams = "https://swapi.dev/api/films/";


  useEffect(() => {


    fetch(urlMissions)
      .then(res => res.json())
      .then(data => ctx.setMissions(data.results))
      .catch(err => console.error(err))

    fetch(urlPersonnel)
      .then(res => res.json())
      .then(data => ctx.setTeams(data.results))
      .catch(err => console.error(err))

      fetch(urlTeams)
      .then(res => res.json())
      .then(data => ctx.setPersonnel(data.results))
      .catch(err => console.error(err))


  }, []);
  




  return (
    <div></div>
  )
}

export default Fetches