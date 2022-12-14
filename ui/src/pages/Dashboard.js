import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import Clock from "react-live-clock";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import CiTeamStatus from "./CiTeamStatus";
import HumintTeamStatus from "./HumintTeamStatus";
import SigintTeamStatus from "./SigintTeamStatus";
import { toPoint } from "mgrs";

const Dashboard = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [upcomingMissions, setUpcomingMissions] = useState([]);

  let upcomingMissionsArray = [];
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  useEffect(() => {
    missionsFetch();
  }, []);

  useEffect(() => {
    ctx.missions.forEach((mission, index) => {
      if (
        mission.start_date === ctx.oneDayDate ||
        mission.start_date === ctx.twoDayDate
      ) {
        upcomingMissionsArray.push(mission);
      }
      setUpcomingMissions(upcomingMissionsArray);
    });
  }, [ctx.missions]);

  //next 24 hours
  let oneDayDate = new Date();
  oneDayDate.setTime(oneDayDate.getTime() + 86400000);

  //next 48 hours
  let twoDayDate = new Date();
  twoDayDate.setTime(oneDayDate.getTime() + 86400000);

  //grabbing calendar data from Missions table and formatting it
  const missionsFetch = async () => {
    setLoading(true);

    let missionCalendarArray = [];
    await fetch(`http://localhost:8081/missions`)
      .then((res) => res.json())
      .then((data) =>
        data.map((event) => {
          let startDate = calendarFormat(event.start_date);
          let endDate = calendarFormat(event.end_date);
          let missionCalendarObject = {
            id: event.id,
            team_id: event.team_id,
            title: event.name,
            start: new Date(startDate.year, startDate.month, startDate.day),
            // the end date must be one day past the desired range as that is the day the event "stops"
            end: new Date(endDate.year, endDate.month, endDate.day + 1),
            coords: toPoint(event.location.mgrs),
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

  // Calendar object days: inclusive at the start / exclusive at the end

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
      <li className="dashboard-team-list" key={index}>
        <span>{`${mission.start_date} - ${mission.name}`}</span>
      </li>
    );
  };

  return (
    <>
      {loading && <div>Loading Data...</div>}
      <div className="clocks-container">
        <div className="clock-left">
          <Clock
            className="dashboard-clock"
            format={"HH:mm:ss"}
            ticking={true}
            timezone={"US/Eastern"}
          />
          <p>Ft. Gordon, GA</p>
        </div>
        <div className="clock-center">
          <div className="clock-left">
            <Clock
              className="dashboard-clock"
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"zulu"}
            />
            <p>Zulu</p>
          </div>
        </div>
        <div className="clock-right">
          <div className="clock-left">
            <Clock
              className="dashboard-clock"
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
          <h3 className="upcoming-header">Next 48 hours</h3>{" "}
          {upcomingMissions.length > 0 ? (
            <div className="team-missions">
              {" "}
              <ul>{[...upcomingMissions].map(renderUpcomingMissions)}</ul>
            </div>
          ) : (
            <div>
              Next 48 hours:
              <div className="team-missions"> {`None`} </div>
            </div>
          )}
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
