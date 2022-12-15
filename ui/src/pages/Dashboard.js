import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import Clock from "react-live-clock";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import CiTeamStatus from "./CiTeamStatus";
import HumintTeamStatus from "./HumintTeamStatus";
import SigintTeamStatus from "./SigintTeamStatus";
import { toPoint } from "mgrs";
import DashboardMap from "../components/DashboardMap";
import Places from "../components/Map";

const Dashboard = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [upcomingMissions, setUpcomingMissions] = useState([]);
  const [statusLoad, setStatusLoad] = useState(false);
  let coordinates = { lat: 32.313793143601366, lng: 55.194812819979404 };

  let upcomingMissionsArray = [];
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  useEffect(() => {
    missionsFetch();
    statusFetch();
    toggleRefresh();
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
  }, [ctx.missions, ctx.refresh]);

  //next 24 hours
  let oneDayDate = new Date();
  oneDayDate.setTime(oneDayDate.getTime() + 86400000);

  //next 48 hours
  let twoDayDate = new Date();
  twoDayDate.setTime(oneDayDate.getTime() + 86400000);

  //updating Team status

  const statusFetch = async () => {
    setStatusLoad(true);
    await fetch("http://localhost:8081/teams")
      .then((res) => res.json())
      .then((data) => ctx.setTeams(data))
      .catch((err) => {
        console.log(err);
      });
    setStatusLoad(false);
  };

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
  //console.log(ctx.dashboard)
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
  }, [ctx.refresh]);

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
        <span>
          <Link
            className="dashboard-mission-link"
            to={`/missions/${mission.id}`}
          >{`${mission.start_date} - ${mission.name}`}</Link>
        </span>
      </li>
    );
  };

  const renderMap = () => {
    return <DashboardMap coordinates={coordinates} />;
  };

  useEffect(() => {
    let dashboardMarkersArray = [];
    upcomingMissions.forEach((mission) => {
      ctx.dashboard.forEach((otherMission) => {
        if (mission.id === otherMission.id) {
          dashboardMarkersArray.push({
            id: otherMission.title,
            lat: otherMission.coords[1],
            lng: otherMission.coords[0],
          });
        }
      });
    }, ctx.setDashboardMarkers(dashboardMarkersArray));
  }, [ctx.dashboard, ctx.refresh]);

  return (
    <>
      {loading && <div>Loading Data...</div>}
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

        <div className="dashboard-mapp">
          {ctx.dashboard[0] ? renderMap() : "Loading..."}
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
              <div className="team-missions" style={{ padding: 10 }}>
                {" "}
                {`None`}{" "}
              </div>
            </div>
          )}
        </div>

        <CiTeamStatus />

        <HumintTeamStatus />

        <SigintTeamStatus />
      </div>
    </>
  );
};

export default Dashboard;
