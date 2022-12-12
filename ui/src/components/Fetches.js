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



// async FETCH TEAM TABLE DATA (needed to render team names)
useEffect(() => {
  const fetchData = async () => {
    try{
      const response = await fetch("http://localhost:8081/teams")
      const data = await response.json()
      ctx.setTeamData(data)
    } catch (e) {
      console.log(e)
    }
  }
  fetchData()
}, [ctx.refresh])

// async FETCH PERSONNEL TABLE DATA 
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/personnel")
      const data = await response.json()
      let dataSlice = data.map(item => {
        if (item.dep_start) {
          item.dep_start = item.dep_start.slice(0, 10);
        } if (item.dep_end) {
          item.dep_end = item.dep_end.slice(0, 10);
        }
        return item;
      })
      ctx.setPersonnelData(dataSlice);
      // ctx.setFilteredData(dataSlice);
    } catch (e) {
      console.log(e)
    }
  }
  fetchData()
}, [ctx.refresh])

//Creates new "team_name" column in personnel table being rendered
useEffect(() => {
  let withTeamNames = ctx.personnelData.map(person => {
    ctx.teamData.forEach(team => {
      if (person.team_id === team.id) {
        person.team_name = team.name
      }
    })
    return person;
  })
  ctx.setFilteredData(withTeamNames)
  console.log(ctx.filteredData)
}, [ctx.personnelData])


  
  return <div></div>;
  
};

export default Fetches;
