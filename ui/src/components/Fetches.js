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

      ctx.setUpcomingMissions([]);
  }, [ctx.refresh]);

  // async FETCH TEAM TABLE DATA (needed to render team names)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/teams");
        const data = await response.json();
        ctx.setTeamData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [ctx.refresh]);

  // async FETCH PERSONNEL TABLE DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/personnel");
        const data = await response.json();
        let dataSlice = data.map((item) => {
          if (item.dep_start) {
            item.dep_start = item.dep_start.slice(0, 10);
          }
          if (item.dep_end) {
            item.dep_end = item.dep_end.slice(0, 10);
          }
          return item;
        });
        ctx.setPersonnelData(dataSlice);
        ctx.setFilteredData(dataSlice);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [ctx.refresh]);


  useEffect(() => {  
    const missionStatusCheck = (missionArr) => {
    let changeNeeded = false;
    let today = new Date()
    missionArr.forEach(missionObj => {
      let startCheck = new Date(missionObj.start_date)
      let endCheck = new Date(missionObj.end_date)
        if (missionObj.status === "Cancelled" || missionObj.status === "Complete") {
          
        } else if 
          (today < startCheck && missionObj.status === "Pending") {
        
        } else if 
            (today < startCheck && missionObj.status !== "Pending") {
            missionObj.status = "Pending"
            changeNeeded = true;
          
        } else if 
            (today > endCheck && missionObj.status !== "Complete") {
            missionObj.status = "Complete"
            changeNeeded = true;
        } else if 
            (today >= startCheck && today <= endCheck && missionObj.status !== "Active") {
            missionObj.status = "Active"
            changeNeeded = true;
        }
        if (changeNeeded) {
          let updateObj = {
            start_date: missionObj.start_date,
            end_date: missionObj.end_date,
            location: missionObj.location,
            name: missionObj.name,
            description: missionObj.description,
            status: missionObj.status,
            purpose: missionObj.purpose,
            authority: missionObj.authority,
            end_state: missionObj.end_state,
            transportation_methods: missionObj.transportation_methods,
            timeline: missionObj.timeline,
            pace: missionObj.pace,
            risks: missionObj.risks,
            decision_point: missionObj.decision_point,
            team_id: missionObj.team_id,
          }
          fetch(`http://localhost:8081/missions/${missionObj.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj),
          });
        }
    })
  }
  
    missionStatusCheck(ctx.missions)
  }, [ctx.missions])



  return <div></div>;
};





export default Fetches;

//Creates new "team_name" column in personnel table being rendered
// useEffect(() => {
//   let withTeamNames = ctx.personnelData.map(person => {
//     ctx.teamData.forEach(team => {
//       if (person.team_id === team.id) {
//         person.team_name = team.name
//       }
//     })
//     return person;
//   })
//   ctx.setFilteredData(withTeamNames)
//   console.log(ctx.filteredData)
// }, [ctx.personnelData, ctx.teamData])