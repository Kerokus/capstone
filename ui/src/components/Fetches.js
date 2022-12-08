import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";

const Fetches = () => {
  const ctx = useContext(GlobalContext)  

  
  const urlMissions = "https://swapi.dev/api/planets/";
  const urlPersonnel= "https://swapi.dev/api/people/";
  const urlTeams = "https://swapi.dev/api/films/";


  useEffect(() => {
    ctx.setQuery("")

    fetch(urlMissions)
      .then(res => res.json())
      .then(data => ctx.setStarWarsCharacter(data.results))
      .catch(err => console.error(err))

    fetch(urlPersonnel)
      .then(res => res.json())
      .then(data => ctx.setStarWarsPlanet(data.results))
      .catch(err => console.error(err))

      fetch(urlTeams)
      .then(res => res.json())
      .then(data => ctx.setfilm(data.results))
      .catch(err => console.error(err))


  }, []);
  




  return (
    <div>Fetches</div>
  )
}

export default Fetches