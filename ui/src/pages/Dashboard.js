import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
​
const Dashboard = () => {
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
​
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
​
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
  <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500, width: 700 }}
  />;
  return (
    <div class="dashboard-container">
      <div class="dashboard-calendar">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: 700 }}
        />
      </div>
      <div class="dashboard-map">
        <h3>Map</h3>
      </div>
      <div class="dashboard-upcoming">
        <h3>Next 24/48 Hours</h3>
      </div>
      <div class="ci-team-status">
        <h3>CI Team Red/Green Status</h3>
      </div>
      <div class="humint-team-status">
        <h3>HUMINT Team Red/Green Status</h3>
      </div>
      <div class="sigint-team-status">
        <h3>SIGINT Team Red/Green Status</h3>
      </div>
    </div>
  );
};
​
export default Dashboard;