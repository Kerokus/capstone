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

  let teamName = ctx.clickedTeam.team_name;
  let teamPersonnel = [];

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
  to the teamPersonnel array. Fires once on mount. */
  useEffect(() => {
    ctx.personnel.forEach((person) => {
      if (person.team_name === teamName) {
        teamPersonnel.push(person)
      }
      setMembers(teamPersonnel)
    })
  },[])

/* renders the personnel list of the members of the clicked team */
const renderTeamMembers = (member, index) => {
  return (
    <div className="team-members" key={index}> {`${member.rank} ${member.last_name}, ${member.first_name} (${member.mos})`} </div>
  )
}

/* renders the statuses (personnel, equipment, and comms) of the clicked team. 
runs through ternaries to determine which square emoji to assign. */
const renderTeamStatuses = (status, index) => {
  return (
    <Card border='light' style={{ width: '18rem' }} key={index} bg='dark' text='white'className="mission-card">
      <Card.Body> 
        <div >
          {status.personnel_status === 'green' ? 
            <div>{`Personnel Status: 🟩`}</div>
            : status.personnel_status === 'yellow' ?
            <div>{`Personnel Status: 🟨`}</div> 
            : status.personnel_status === 'red' ?
            <div>{`Personnel Status: 🟥`}</div> 
            : <div>Loading...</div>
          }
          {status.equipment_status === 'green' ? 
            <div>{`Equipment Status: 🟩`}</div>
            : status.equipment_status === 'yellow' ?
            <div>{`Equipment Status: 🟨`}</div> 
            : status.equipment_status === 'red' ?
            <div>{`Equipment Status: 🟥`}</div> 
            : <div>Loading...</div>
          }
          {status.comms_status === 'green' ? 
            <div>{`Comms Status: 🟩`}</div>
            : status.comms_status === 'yellow' ?
            <div>{`Comms Status: 🟨`}</div> 
            : status.comms_status === 'red' ?
            <div>{`Comms Status: 🟥`}</div> 
            : <div>Loading...</div>
          }
        </div>
      </Card.Body>
    </Card>
  )
}


return (
<div class="single-team-container">
  <div class="team-calendar">
  <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{ height: "1fr", width: "1fr" }}
  />
  </div>
  <iframe className="team-mapp" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1043662.1012423536!2d46.993846776877206!3d29.296531908146836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc5363fbeea51a1%3A0x74726bcd92d8edd2!2sKuwait!5e0!3m2!1sen!2sus!4v1670945028777!5m2!1sen!2sus" 
  width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>



  {members.length > 0 ?
  <div className="team-members-container">Team Members: {[...members].map(renderTeamMembers)}</div> :
  <div>Loading...</div>
}







  <div class="upcoming-events-container">
    <div class="upcoming-event">24/48 hour events</div>
  </div>
  <div class="team-admin-container">
    <div class="team-name">{ctx.clickedTeam.team_name}</div>
    <div class="team-status-container">
    
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
  </div>
  
  <div class="team-location">{`${ctx.clickedTeam.location.country} - ${ctx.clickedTeam.location.city_base}`}</div>
</div>
)};

export default SingleTeam;

//html





{/* <div className="single-team-container">
<div className="team-name">{ctx.clickedTeam.team_name}</div>

<div className="team-map">

<iframe title='title' className="map-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1085370.7065123466!2d47.563124648987184!3d29.421493229527936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc5363fbeea51a1%3A0x74726bcd92d8edd2!2sKuwait!5e0!3m2!1sen!2sus!4v1670895869909!5m2!1sen!2sus" 
  width="600" height="300"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
</iframe>

  
<div className="team-location">{`${ctx.clickedTeam.location.country} - ${ctx.clickedTeam.location.city_base}`}</div>

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
<div className="team-upcoming">team upcoming</div>

{members.length > 0 ?
  <div className="team-members-container">Team Members: {[...members].map(renderTeamMembers)}</div> :
  <div>Loading...</div>
}

<div className="team-status">

  <div className="team-personnel-status">Personnel Status:</div>
  {ctx.clickedTeam.personnel_status === 'green' ? 
  <div className="team-personnel-status-color">🟩</div>
  : ctx.clickedTeam.personnel_status === 'yellow' ?
  <div className="team-personnel-status-color">🟨</div> 
  : ctx.clickedTeam.personnel_status === 'red' ?
  <div className="team-personnel-status-color">🟥</div> 
  : <div>Loading...</div>
  }

  <div className="team-equipment-status">Equipment Status:</div>
  {ctx.clickedTeam.equipment_status === 'green' ? 
  <div className="team-equipment-status-color">🟩</div>
  : ctx.clickedTeam.equipment_status === 'yellow' ?
  <div className="team-equipment-status-color">🟨</div> 
  : ctx.clickedTeam.equipment_status === 'red' ?
  <div className="team-equipment-status-color">🟥</div> 
  : <div>Loading...</div>
  }

  <div className="team-comms-status">Comms Status:</div>
  {ctx.clickedTeam.comms_status === 'green' ? 
  <div className="team-comms-status-color">🟩</div>
  : ctx.clickedTeam.comms_status === 'yellow' ?
  <div className="team-comms-status-color">🟨</div> 
  : ctx.clickedTeam.comms_status === 'red' ?
  <div className="team-comms-status-color">🟥</div> 
  : <div>Loading...</div>
  }

</div>
</div> */}
