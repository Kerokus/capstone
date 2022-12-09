import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";

const Dashboard = () => {
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  //Luxon library - GO FIND IT
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-calendar">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "1fr", width: "1fr" }}
        />
      </div>
      <div className="dashboard-map">
        <h3>Map</h3>
      </div>
      <div className="dashboard-upcoming">
        <h3>Next 24/48 Hours</h3>
      </div>
      <div className="ci-team-status">
        <h3>CI Team Red/Green Status</h3>
      </div>
      <div className="humint-team-status">
        <h3>HUMINT Team Red/Green Status</h3>
      </div>
      <div className="sigint-team-status">
        <h3>SIGINT Team Red/Green Status</h3>
      </div>
    </div>
  );
};

export default Dashboard;
