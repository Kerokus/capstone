import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
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
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  useEffect(() => {
    missionsFetch();
  }, []);

  //let result = datetest.replace(/-/g, ',');

  //grabs mission data and replaces dashes with commas for calendar
  const missionsFetch = async () => {
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
    console.log(missionCalendarArray);
    ctx.setDashboard(missionCalendarArray);
    setLoading(false);
  };

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

  // const events = [
  //   {
  //     title: "Operation: Justinson",
  //     start: new Date(2022, 11, 5),
  //     end: new Date(2022, 11, 8),
  //   },
  //   {
  //     title: "CIT 2 Liaison Meeting",
  //     start: new Date(2022, 11, 6),
  //     end: new Date(2022, 11, 6),
  //   },
  //   {
  //     title: "HUMINT Team 2 Recruitment Meeting",
  //     start: new Date(2022, 11, 15),
  //     end: new Date(2022, 11, 18),
  //   },
  //   {
  //     title: "CIT 1 CIVA",
  //     start: new Date(2022, 11, 10),
  //     end: new Date(2022, 11, 15),
  //   },
  // ];

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
        <div className="dashboard-map">
          <h3>Map</h3>
        </div>
        <div className="dashboard-upcoming">
          <h3>Next 24/48 Hours</h3>
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
