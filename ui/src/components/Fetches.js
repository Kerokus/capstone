import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import config from './config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
const Fetches = () => {
  const ctx = useContext(GlobalContext);

  const urlMissions = "http://localhost:8081/missions";
  const urlPersonnel = "http://localhost:8081/personnel";
  const urlTeams = "http://localhost:8081/teams";

  useEffect(() => {
    fetch(ApiUrl + "/missions")
      .then((res) => res.json())
      .then((data) => ctx.setMissions(data))
      .catch((err) => console.error(err));

    fetch(ApiUrl + "/personnel")
      .then((res) => res.json())
      .then((data) => ctx.setPersonnel(data))
      .catch((err) => console.error(err));

    fetch(ApiUrl + "/teams")
      .then((res) => res.json())
      .then((data) => ctx.setTeams(data))
      .catch((err) => console.error(err));

      ctx.setUpcomingMissions([]);
  }, [ctx.refresh]);

  // async FETCH TEAM TABLE DATA (needed to render team names)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ApiUrl + "/teams");
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
        const response = await fetch(ApiUrl + "/personnel");
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
    const missionStatusCheck = (missions) => {
      //the following two functions are necessary to do string comparissons against the mission dates.
      const padTo2Digits = (num) => {
        return num.toString().padStart(2, "0");
      };

      const formatDate = (date) => {
        return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join("-");
      };
// the following 4 lines of code are necessary to get todays date in a string format to be compared to the mission dates
      let currentDate = new Date();
      currentDate.setTime(currentDate.getTime());
      let today = formatDate(currentDate)

      

      missions.forEach(mission => {
        let changeNeeded = false;
        // console.log(`start: ${mission.start_date}, end: ${mission.end_date}, today: ${today}`)

        if (mission.status !== 'Cancelled') {
          if (today > mission.end_date && mission.status !== 'Complete'){
            mission.status = 'Complete'
            changeNeeded = true
          }
          if (today < mission.start_date && mission.status !== 'Pending' && mission.status !== 'Complete') {
            mission.status = 'Pending'
            changeNeeded = true
          }
          if (today >= mission.start_date && today < mission.end_date && mission.status !== 'Complete') {
            mission.status = 'Active'
            changeNeeded = true
          }
        }
        if (changeNeeded) {
          let updateObj = {
            start_date: mission.start_date,
            end_date: mission.end_date,
            location: mission.location,
            name: mission.name,
            description: mission.description,
            status: mission.status,
            purpose: mission.purpose,
            authority: mission.authority,
            end_state: mission.end_state,
            transportation_methods: mission.transportation_methods,
            timeline: mission.timeline,
            pace: mission.pace,
            risks: mission.risks,
            decision_point: mission.decision_point,
            team_id: mission.team_id,
          }
          fetch((ApiUrl + `/missions/${mission.id}`), {
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