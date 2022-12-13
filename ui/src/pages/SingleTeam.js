import React, { useContext, useEffect, useState } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { Link } from 'react-router-dom';

const SingleTeam = () => {
  const ctx = useContext(GlobalContext);
  const [members, setMembers] = useState([]);
  const [missions, setMissions] = useState([]);
  const [upcomingMissions, setUpcomingMissions] = useState([]);

  let teamName = ctx.clickedTeam.team_name;
  let teamPersonnelArray = [];
  let teamMissionsArray = [];
  let upcomingMissionsArray = [];

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* calendar shit */
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  const events = [
    {
      title: "Operation: Justinson",
      start: new Date(2022, 11, 5),
      end: new Date(2022, 11, 8),
    },
    {
      title: "CIT 2 Liaison Meeting",
      start: new Date(2022, 11, 6),
      end: new Date(2022, 11, 6),
    },
    {
      title: "HUMINT Team 2 Recruitment Meeting",
      start: new Date(2022, 11, 15),
      end: new Date(2022, 11, 18),
    },
    {
      title: "CIT 1 CIVA",
      start: new Date(2022, 11, 10),
      end: new Date(2022, 11, 15),
    },
  ];

/* iterates through the personnel state variable and pushes all personnel that are on the clicked team 
to the teamPersonnel array. Then sets the members state variable with that array. Fires when the personnel state variable changes. */
  useEffect(() => {
    ctx.personnel.forEach((person) => {
      if (person.team_name === teamName) {
        teamPersonnelArray.push(person)
      }
      setMembers(teamPersonnelArray)
    })
  },[ctx.personnel])


/* iterates over the missions state variable and pushes missions with the team_id of the clicked team to the teamMissionArray.
Then sets the missions state variable with that array. Fires when the missions state variable changes. */
useEffect(() => {
  ctx.missions.forEach((mission, index) => {
    if (mission.team_id === ctx.clickedTeam.id) {
      teamMissionsArray.push(mission)
    }
    setMissions(teamMissionsArray)
  })
}, [ctx.missions])

// all this is for the upcoming missions data
    //next 24 hours
    let oneDayDate = new Date();
    oneDayDate.setTime(oneDayDate.getTime() + 86400000);

    //next 48 hours
    let twoDayDate = new Date();
    twoDayDate.setTime(oneDayDate.getTime() + 86400000);

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
  
    useEffect(() => {
      ctx.setOneDayDate(formatDate(oneDayDate))
      ctx.setTwoDayDate(formatDate(twoDayDate))
    }, [])

    useEffect(() => {
      missions.forEach((mission, index) => {
        if (mission.start_date === ctx.oneDayDate || mission.start_date === ctx.twoDayDate) {
          upcomingMissionsArray.push(mission)
        }
        setUpcomingMissions(upcomingMissionsArray)
      })
    }, [ctx.oneDayDate, ctx.twoDayDate])

    console.log(upcomingMissions)


/* renders the personnel list of the members of the clicked team */
const renderTeamMembers = (member, index) => {
  return (
    <div className="team-members" key={index}> {`${member.rank} ${member.last_name}, ${member.first_name} (${member.mos})`} </div>
  )
}

/* renders all missions assigned to the clicked team */
const renderTeamMissions = (mission, index) => {
  return (
    <div className="team-missions" key={index}> {`${mission.name}`} </div>
  )
}

/* renders upcoming missions assigned to the clicked team */
const renderUpcomingMissions = (mission, index) => {
  return (
    <div className="team-missions" key={index}> {`${mission.start_date} / ${mission.name}`} </div>
  )
}




return (

<div className="single-team-container">
  <div className="team-admin-container">
    <div class="team-name">{ctx.clickedTeam.team_name}</div>

          {ctx.clickedTeam.personnel_status === 'green' ? 
      <div className="team-personnel-status">Personnel Status:  🟩</div>
      : ctx.clickedTeam.personnel_status === 'yellow' ?
      <div className="team-personnel-status">Personnel Status:  🟨</div> 
      : ctx.clickedTeam.personnel_status === 'red' ?
      <div className="team-personnel-status">Personnel Status:  🟥</div> 
      : <div>Loading...</div>
      }
      {ctx.clickedTeam.equipment_status === 'green' ? 
      <div className="team-equipment-status">Equipment Status:  🟩</div>
      : ctx.clickedTeam.equipment_status === 'yellow' ?
      <div className="team-equipment-status">Equipment Status:  🟨</div> 
      : ctx.clickedTeam.equipment_status === 'red' ?
      <div className="team-equipment-status">Equipment Status:  🟥</div> 
      : <div>Loading...</div>
      }
      {ctx.clickedTeam.comms_status === 'green' ? 
      <div className="team-comms-status">Comms Status:  🟩</div>
      : ctx.clickedTeam.comms_status === 'yellow' ?
      <div className="team-comms-status">Comms Status:  🟨</div> 
      : ctx.clickedTeam.comms_status === 'red' ?
      <div className="team-comms-status">Comms Status:  🟥</div> 
      : <div>Loading...</div>
      }
  </div>
  <div className="team-calendar">
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "1fr", width: "1fr" }}
    />
  </div>
  
  {/* <div className="team-upcoming-container">Upcoming Missions: </div> */}
  <div className="team-upcoming-container"> 
  {members.length > 0 ?
  <div className="team-missions">Upcoming Missions: {[...upcomingMissions].map(renderUpcomingMissions)}</div> :
  <div>Loading...</div>
  }
  </div>


  <div className="team-all-missions-container"> 
  {members.length > 0 ?
  <div className="team-missions">All Missions: {[...missions].map(renderTeamMissions)}</div> :
  <div>Loading...</div>
  }
  </div>


  <div className="team-location">{`${ctx.clickedTeam.location.country} - ${ctx.clickedTeam.location.city_base}`}</div>

  <iframe className="team-mapp" title="title" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1043662.1012423536!2d46.993846776877206!3d29.296531908146836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc5363fbeea51a1%3A0x74726bcd92d8edd2!2sKuwait!5e0!3m2!1sen!2sus!4v1670945028777!5m2!1sen!2sus" 
  width="800" height="450" loading="lazy">
  </iframe>


  <div className="team-personnel-container"> 
  {members.length > 0 ?
  <div className="team-members">Team Members: {[...members].map(renderTeamMembers)}</div> :
  <div>Loading...</div>
  }
  </div>
</div>

)};

export default SingleTeam;

// //html

// <div class="single-team-container">
//   <div class="team-calendar">
//   <Calendar
//     localizer={localizer}
//     events={events}
//     startAccessor="start"
//     endAccessor="end"
//     style={{ height: "1fr", width: "1fr" }}
//   />
//   </div>
//   <iframe className="team-mapp" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1043662.1012423536!2d46.993846776877206!3d29.296531908146836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc5363fbeea51a1%3A0x74726bcd92d8edd2!2sKuwait!5e0!3m2!1sen!2sus!4v1670945028777!5m2!1sen!2sus" 
//   width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>



//   {members.length > 0 ?
//   <div className="team-members-container">Team Members: {[...members].map(renderTeamMembers)}</div> :
//   <div>Loading...</div>
//   }







//   <div class="upcoming-events-container">
//     <div class="upcoming-event">24/48 hour events</div>
//   </div>
//   <div class="team-admin-container">
//     <div class="team-name">{ctx.clickedTeam.team_name}</div>
//     <div class="team-status-container">
    
//       {ctx.clickedTeam.personnel_status === 'green' ? 
//       <div className="team-personnel-status">Personnel Status:  🟩</div>
//       : ctx.clickedTeam.personnel_status === 'yellow' ?
//       <div className="team-personnel-status">Personnel Status:  🟨</div> 
//       : ctx.clickedTeam.personnel_status === 'red' ?
//       <div className="team-personnel-status">Personnel Status:  🟥</div> 
//       : <div>Loading...</div>
//       }
//       {ctx.clickedTeam.equipment_status === 'green' ? 
//       <div className="team-equipment-status">Equipment Status:  🟩</div>
//       : ctx.clickedTeam.equipment_status === 'yellow' ?
//       <div className="team-equipment-status">Equipment Status:  🟨</div> 
//       : ctx.clickedTeam.equipment_status === 'red' ?
//       <div className="team-equipment-status">Equipment Status:  🟥</div> 
//       : <div>Loading...</div>
//       }
//       {ctx.clickedTeam.comms_status === 'green' ? 
//       <div className="team-comms-status">Comms Status:  🟩</div>
//       : ctx.clickedTeam.comms_status === 'yellow' ?
//       <div className="team-comms-status">Comms Status:  🟨</div> 
//       : ctx.clickedTeam.comms_status === 'red' ?
//       <div className="team-comms-status">Comms Status:  🟥</div> 
//       : <div>Loading...</div>
//       }

//     </div>
//   </div>
  
//   <div class="team-location">{`${ctx.clickedTeam.location.country} - ${ctx.clickedTeam.location.city_base}`}</div>
// </div>




