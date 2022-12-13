import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import Clock from "react-live-clock";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
import CiTeamStatus from "./CiTeamStatus";
import HumintTeamStatus from "./HumintTeamStatus";
import SigintTeamStatus from "./SigintTeamStatus";

const Dashboard = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [upcomingMissions, setUpcomingMissions] = useState([]);

  let upcomingMissionsArray = [];
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  useEffect(() => {
    console.log("use effect fire")
    missionsFetch();
  }, []);

  useEffect(() => {
    ctx.missions.forEach((mission, index) => {
      if (mission.start_date === ctx.oneDayDate || mission.start_date === ctx.twoDayDate) {
        upcomingMissionsArray.push(mission)
      }
      setUpcomingMissions(upcomingMissionsArray)
    })
  }, [ctx.oneDayDate, ctx.twoDayDate])

  //next 24 hours
  let oneDayDate = new Date();
  oneDayDate.setTime(oneDayDate.getTime() + 86400000);
  
  //next 48 hours
  let twoDayDate = new Date();
  twoDayDate.setTime(oneDayDate.getTime() + 86400000);

  //grabbing calendar data from Missions table and formatting it
  const missionsFetch = async () => {
    console.log("mission fetch fire")
    setLoading(true);

    let missionCalendarArray = [];
    await fetch(`http://localhost:8081/missions`)
      .then((res) => res.json())
      .then((data) =>
        data.map((event) => {
          let missionCalendarObject = {
            title: event.name,
            start: new Date(
              calendarFormat(event.start_date)[0],
              calendarFormat(event.start_date)[1],
              calendarFormat(event.start_date)[2]
            ),
            end: new Date(
              calendarFormat(event.end_date)[0],
              calendarFormat(event.end_date)[1],
              calendarFormat(event.end_date)[2]
            ),
          };
          missionCalendarArray.push(missionCalendarObject);
        })
      )
      .catch((err) => {
        console.log(err);
      });
    ctx.setDashboard(missionCalendarArray);
    setLoading(false);
  };



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

  const calendarFormat = (string) => {
    let dateHandler = new Date(string);
    return [
      dateHandler.getFullYear(),
      dateHandler.getMonth(),
      dateHandler.getDate(),
    ];
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  /* renders upcoming missions assigned to the clicked team */
const renderUpcomingMissions = (mission, index) => {
  return (
    <div className="team-missions" key={index}> {`${mission.start_date} / ${mission.name}`} </div>
  )
}

  return (
    <>
      {loading && <div>Loading Data...</div>}
      <div className="clocks-container">
        <div className="clock-left">
          <Clock format={"HH:mm:ss"} ticking={true} timezone={"US/Eastern"} />
          <p>Ft. Gordon, GA</p>
        </div>
        <div className="clock-center">
          <div className="clock-left">
            <Clock format={"HH:mm:ss"} ticking={true} timezone={"zulu"} />
            <p>Zulu</p>
          </div>
        </div>
        <div className="clock-right">
          <div className="clock-left">
            <Clock
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"Asia/Kuwait"}
            />
            <p>Kuwait City</p>
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        {ctx.dashboard[0] && (
          <div className="dashboard-calendar">
            {console.log("CALENDAR FIRE")}
            <Calendar
              localizer={localizer}
              events={ctx.dashboard}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "1fr", width: "1fr" }}
            />
          </div>
        )}
        <div className="dashboard-map">
          <h3>Map</h3>
        </div>

        <div className="dashboard-upcoming"> 
        {upcomingMissions.length > 0 ?
        <div className="team-missions"> <h3 className="upcoming-header">Upcoming Missions:</h3>  {[...upcomingMissions].map(renderUpcomingMissions)}</div> :
        <div>Upcoming Missions: 
          <div className="team-missions" > {`None`} </div>
        </div>
        }
        </div>

        <div className="ci-team-status">
          <CiTeamStatus />
        </div>
        <div className="humint-team-status">
          <HumintTeamStatus />
        </div>
        <div className="sigint-team-status">
          <SigintTeamStatus />
        </div>
      </div>
    </>
  );
};

export default Dashboard;