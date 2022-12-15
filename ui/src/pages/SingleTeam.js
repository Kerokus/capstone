import React, { useContext, useEffect, useState } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { Link } from "react-router-dom";
import { toPoint } from "mgrs";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const SingleTeam = () => {
  const ctx = useContext(GlobalContext);
  const [members, setMembers] = useState([]);
  const [missions, setMissions] = useState([]);
  const [upcomingMissions, setUpcomingMissions] = useState([]);
  const [loading, setLoading] = useState(false);

  let teamName = ctx.clickedTeam.team_name;
  let teamPersonnelArray = [];
  let teamMissionsArray = [];
  let upcomingMissionsArray = [];

  // scrolls screen to the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* calendar tools */
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

  // calls Justin's mission fetch function
  useEffect(() => {
    missionsFetch();
  }, []);

  //grabbing calendar data from Missions table and formatting it
  const missionsFetch = async () => {
    setLoading(true);

    let missionCalendarArray = [];
    await fetch(`http://localhost:8081/missions`)
      .then((res) => res.json())
      .then((data) =>
        data.map((event) => {
          if (event.team_id === ctx.clickedTeam.id) {
            let startDate = calendarFormat(event.start_date);
            let endDate = calendarFormat(event.end_date);
            let missionCalendarObject = {
              title: event.name,
              start: new Date(startDate.year, startDate.month, startDate.day),
              // the end date must be one day past the desired range as that is the day the event "stops"
              end: new Date(endDate.year, endDate.month, endDate.day + 1),
              coords: toPoint(event.location.mgrs),
            };
            missionCalendarArray.push(missionCalendarObject);
          }
        })
      )
      .catch((err) => {
        console.log(err);
      });
    ctx.setDashboard(missionCalendarArray);
    setLoading(false);
  };

  // the database days are zero based, the Calendar object days are 1 based
  const calendarFormat = (string) => {
    let dateHandler = new Date(string);
    return {
      year: dateHandler.getFullYear(),
      month: dateHandler.getMonth(),
      // add one to the day to convert the format
      day: dateHandler.getDate() + 1,
    };
  };

  /* iterates through the personnel state variable and pushes all personnel that are on the clicked team 
to the teamPersonnel array. Then sets the members state variable with that array. Fires when the personnel state variable changes. */
  useEffect(() => {
    ctx.personnel.forEach((person) => {
      if (person.team_name === teamName) {
        teamPersonnelArray.push(person);
      }
      setMembers(teamPersonnelArray);
    });
  }, [ctx.personnel]);

  /* iterates over the missions state variable and pushes missions with the team_id of the clicked team to the teamMissionArray.
Then sets the missions state variable with that array. Fires when the missions state variable changes. */
  useEffect(() => {
    ctx.missions.forEach((mission, index) => {
      if (mission.team_id === ctx.clickedTeam.id) {
        teamMissionsArray.push(mission);
      }
      setMissions(teamMissionsArray);
    });
  }, [ctx.missions]);

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
    ctx.setOneDayDate(formatDate(oneDayDate));
    ctx.setTwoDayDate(formatDate(twoDayDate));
  }, []);

  useEffect(() => {
    missions.forEach((mission, index) => {
      if (
        mission.start_date === ctx.oneDayDate ||
        mission.start_date === ctx.twoDayDate
      ) {
        upcomingMissionsArray.push(mission);
      }
      setUpcomingMissions(upcomingMissionsArray);
    });
  }, [ctx.dashboard]);

  /* renders the personnel list of the members of the clicked team */
  const renderTeamMembers = (member, index) => {
    return (
      <div className="team-members" key={index}>
        {" "}
        {`${member.rank} ${member.last_name}, ${member.first_name} (${member.mos})`}{" "}
      </div>
    );
  };

  /* renders all missions assigned to the clicked team */
  const renderTeamMissions = (mission, index) => {
    return (
      <div className="team-missions" key={index}>
        {" "}
        {`${mission.start_date} | ${mission.name}`}{" "}
      </div>
    );
  };

  /* renders upcoming missions assigned to the clicked team */
  const renderUpcomingMissions = (mission, index) => {
    return (
      <div className="team-missions" key={index}>
        {" "}
        {`${mission.start_date} | ${mission.name}`}{" "}
      </div>
    );
  };

  //DATA HANDLERS

  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  const handleStatusChange = async (event) => {
    let newData = { ...ctx.clickedTeam };
    newData[event.target.id] = event.target.value;
    await ctx.setClickedTeam(newData);
    console.log(ctx.clickedTeam);

    try {
      let response = await fetch(
        `http://localhost:8081/teams/${ctx.clickedTeam.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );
      if (response.status !== 201) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
    toggleRefresh();
  };

  return (
    <div className="single-team-container">
      <div className="team-admin-container">
        <div className="team-name">{ctx.clickedTeam.team_name}</div>

        <div className="team-personnel-status">
          Personnel Status:{" "}
          <Form.Group as={Col} md="4">
            <Form.Select
              md="3"
              id="personnel_status"
              onChange={(e) => handleStatusChange(e)}
              value={ctx.clickedTeam.personnel_status}
              aria-label="Default select example"
            >
              <option>Green</option>
              <option>Yellow</option>
              <option>Red</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="team-equipment-status">
          Equipment Status:
          <Form.Group as={Col} md="4">
            <Form.Select
              md="3"
              id="equipment_status"
              onChange={(e) => handleStatusChange(e)}
              value={ctx.clickedTeam.equipment_status || ""}
              aria-label="Default select example"
            >
              <option>Green</option>
              <option>Yellow</option>
              <option>Red</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="team-comms-status">
          Comms Status:
          <Form.Group as={Col} md="4">
            <Form.Select
              md="3"
              id="comms_status"
              onChange={(e) => handleStatusChange(e)}
              value={ctx.clickedTeam.comms_status || ""}
              aria-label="Default select example"
            >
              <option>Green</option>
              <option>Yellow</option>
              <option>Red</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <div className="team-calendar">
        <Calendar
          localizer={localizer}
          events={ctx.dashboard}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "1fr", width: "1fr" }}
        />
      </div>

      <div className="team-upcoming-container">
        {upcomingMissions.length > 0 ? (
          <div className="team-missions">
            Upcoming Missions:{" "}
            {[...upcomingMissions].map(renderUpcomingMissions)}
          </div>
        ) : (
          <div className="team-missions">
            Upcoming Missions: <div>{`No Upcoming Missions`} </div>
          </div>
        )}
      </div>

      <div className="team-all-missions-container">
        {missions.length > 0 ? (
          <div className="team-missions">
            All Missions: {[...missions].map(renderTeamMissions)}
          </div>
        ) : (
          <div className="team-missions">
            All Missions: <div>{`No Assigned Missions`} </div>
          </div>
        )}
      </div>

      <div className="team-location">{`${ctx.clickedTeam.location.country} - ${ctx.clickedTeam.location.city_base}`}</div>

      <iframe
        className="team-mapp"
        title="title"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1043662.1012423536!2d46.993846776877206!3d29.296531908146836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc5363fbeea51a1%3A0x74726bcd92d8edd2!2sKuwait!5e0!3m2!1sen!2sus!4v1670945028777!5m2!1sen!2sus"
        width="800"
        height="450"
        loading="lazy"
      ></iframe>

      <div className="team-personnel-container">
        {members.length > 0 ? (
          <div className="team-members">
            Team Members: {[...members].map(renderTeamMembers)}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SingleTeam;
