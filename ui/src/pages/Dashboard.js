import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
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

// try the tabs imports
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



const Dashboard = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [upcomingMissions, setUpcomingMissions] = useState([]);
  const [statusLoad, setStatusLoad] = useState(false);
  let coordinates = { lat: 27.462945821868242, lng: 49.41946212564189 };

  
  
  useEffect(() => {
  document.getElementsByClassName("webpage-title").disabled='disabled';
  }, [ctx.missions, ctx.refresh])

  //tab state
const [value, setValue] = useState('1');

useEffect(() => {
  setValue('1')
}, [ctx.refresh])

// handle Change for tabs
const handleChange = (event, newValue ) => {
  setValue(newValue);
};

//handle click for tabs
const handleClick = (event) => {
};



  let allMissionsArray = [ctx.missions];
  let activeMissionsArray = [];
  let upcomingMissionsArray = [];

  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

    // scrolls screen to the top when the component is mounted
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  useEffect(() => {
    missionsFetch();
    statusFetch();
    toggleRefresh();
    ctx.setClickedMission();
    ctx.setCiTeams([])
    ctx.setTeams([])
    ctx.setCiTeams([])
    ctx.setHumintTeams([])
    ctx.setSigintTeams([])
    ctx.setRedCiTeams([])
    ctx.setYellowCiTeams([])
    ctx.setGreenCiTeams([])
    ctx.setRedHumintTeams([])
    ctx.setYellowHumintTeams([])
    ctx.setGreenHumintTeams([])
    ctx.setRedSigintTeams([])
    ctx.setYellowSigintTeams([])
    ctx.setGreenSigintTeams([])
  }, []);

  //all missions markers 
  useEffect(() => {
    ctx.setDisplayedMarkers(ctx.dashboardMarkersAll)
  }, [ctx.missions, ctx.dashboardMarkersAll])
  
  
  // upcoming missions
  useEffect(() => {
    ctx.missions.forEach((mission, index) => {
      if (
        mission.start_date === ctx.oneDayDate ||
        mission.start_date === ctx.twoDayDate
      ) {
        if (mission.status !== 'Complete' && mission.status !== 'Cancelled') {
          upcomingMissionsArray.push(mission);
        }
      }
      ctx.setUpcomingMissions(upcomingMissionsArray);
    });
  }, [ctx.missions]);

  // ongoing missions
  useEffect(() => {
    let currentDate = new Date();
    currentDate.setTime(currentDate.getTime());
    let today = formatDate(currentDate)
    ctx.missions.forEach((mission, index) => {
      // console.log(mission.start_date <= today)
      // console.log(mission.start_date <= today)
    if (mission.status !== 'Complete' && mission.status !== 'Cancelled') {
      if (
        mission.start_date <= today && mission.end_date >= today
      ) {
        activeMissionsArray.push(mission);
      }
    }
    });
    ctx.setOngoingMissions(activeMissionsArray);
  }, [ctx.missions]);

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

    /* renders All missions that aren't pending or complete */
    const testRender = (mission, index) => {
      if (mission.status !== 'Complete' && mission.status !== 'Cancelled') {
        if (mission.marker_status === 'active') {
          console.log(mission)
          return (
            <li className="dashboard-team-list-active" key={index}>
              <span>
                <Link
                  onClick={() => {
                    ctx.setClickedMission(mission);
                  }}
                  className="dashboard-mission-link"
                  to={`/missions/${mission.id}`}
                >{`${mission.start_date} - ${mission.name} (${mission.status})`}</Link>
              </span>
            </li>
          );
        } else if (mission.marker_status === 'upcoming') {
          return (
            <li className="dashboard-team-list-upcoming" key={index}>
              <span>
                <Link
                  onClick={() => {
                    ctx.setClickedMission(mission);
                  }}
                  className="dashboard-mission-link"
                  to={`/missions/${mission.id}`}
                >{`${mission.start_date} - ${mission.name} (${mission.status})`}</Link>
              </span>
            </li>
          );
        }
      }
    };


  /* renders upcoming missions assigned to the clicked team */
  const renderUpcomingMissions = (mission, index) => {
    return (
      <li className="dashboard-team-list-not-all" key={index}>
        <span>
          <Link
            onClick={() => {
              ctx.setClickedMission(mission);
            }}
            className="dashboard-mission-link"
            to={`/missions/${mission.id}`}
          >{`${mission.start_date} - ${mission.name}`}</Link>
        </span>
      </li>
    );
  };

    /* renders All missions that aren't pending or complete */
    const renderAllMissions = (mission, index) => {
      if (mission.status !== 'Complete' && mission.status !== 'Cancelled') {
        return (
          <li className="dashboard-team-list-all" key={index}>
            <span>
              <Link
                onClick={() => {
                  ctx.setClickedMission(mission);
                }}
                className="dashboard-mission-link"
                to={`/missions/${mission.id}`}
              >{`${mission.start_date} - ${mission.name}`}</Link>
            </span>
          </li>
        );
      }
    };

  const renderMap = () => {
    return <DashboardMap coordinates={coordinates} />;
  };

  useEffect(() => {
    let dashboardMarkersUpcomingArray = [];
    ctx.upcomingMissions.forEach((mission) => {
      ctx.dashboard.forEach((otherMission) => {
        mission.marker_status = 'upcoming'
        if (mission.id === otherMission.id) {
          dashboardMarkersUpcomingArray.push({
            id: otherMission.title,
            marker_status: 'upcoming',
            lat: otherMission.coords[1],
            lng: otherMission.coords[0],
          });
        }
      });
    }, ctx.setDashboardMarkersUpcoming(dashboardMarkersUpcomingArray));
  }, [ctx.dashboard, ctx.upcomingMissions, ctx.dashboardMarkersActive]);

  useEffect(() => {
    let dashboardMarkersActiveArray = [];
    ctx.ongoingMissions.forEach((mission) => {
      ctx.dashboard.forEach((otherMission) => {
        
        if (mission.id === otherMission.id) {
          dashboardMarkersActiveArray.push({
            id: otherMission.title,
            marker_status: 'active',
            lat: otherMission.coords[1],
            lng: otherMission.coords[0],
          });
        }
      });
    }, ctx.setDashboardMarkersActive(dashboardMarkersActiveArray));
  }, [ctx.dashboard, ctx.ongoingMissions]);

  // useEffect(() => {
  //   let dashboardMarkersAllArray = [];
  //   ctx.missions.forEach((mission) => {
  //     ctx.dashboard.forEach((otherMission) => {
  //       if (mission.id === otherMission.id) {
  //         console.log(mission)
  //         dashboardMarkersAllArray.push({
  //           id: otherMission.title,
  //           marker_status: 'all',
  //           lat: otherMission.coords[1],
  //           lng: otherMission.coords[0],
  //         });
  //       }
  //     });
  //   }, ctx.setDashboardMarkersAll(dashboardMarkersAllArray));
  // }, [ctx.dashboard, ctx.refresh]);

  useEffect(() => {
    let dashboardMarkersAllArray = []

    ctx.ongoingMissions.forEach((mission) => {
      ctx.dashboard.forEach((otherMission) => {
        if (mission.id === otherMission.id) {
          mission.marker_status = 'active'
          dashboardMarkersAllArray.push({
            id: otherMission.title,
            marker_status: 'active',
            lat: otherMission.coords[1],
            lng: otherMission.coords[0],
          })
        }
      })
    },
    ctx.upcomingMissions.forEach((mission) => {
      ctx.dashboard.forEach((otherMission) => {
        if (mission.id === otherMission.id) {
          mission.marker_status = 'upcoming'
          dashboardMarkersAllArray.push({
            id: otherMission.title,
            marker_status: 'upcoming',
            lat: otherMission.coords[1],
            lng: otherMission.coords[0],
          })
        }
      })
    },


    
    ctx.setDashboardMarkersAll(dashboardMarkersAllArray))
    

)}, [ctx.dashboard, ctx.missions, ctx.upcomingMissions, ctx.ongoingMissions]);

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

        <Box sx={{ width: '100%', typography: 'body1' }} className="dashboard-upcoming">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label={`Ongoing and Upcoming (${ctx.dashboardMarkersAll.length})`} value="1" onClick={(event) => {
                  ctx.setDisplayedMarkers(ctx.dashboardMarkersAll)
                  handleClick(event)}}/>
                <Tab label={`Ongoing (${ctx.dashboardMarkersActive.length})`}value="2" onClick={(event) => {
                  ctx.setDisplayedMarkers(ctx.dashboardMarkersActive)
                  handleClick(event)}}/>
                <Tab label={`Upcoming (${ctx.dashboardMarkersUpcoming.length})`} value="3" onClick={(event) => {
                  ctx.setDisplayedMarkers(ctx.dashboardMarkersUpcoming)
                  handleClick(event)}}/>
              </TabList>
            </Box>

                <TabPanel value="1">
                  <div >
                    <h3 className="upcoming-header">Ongoing and Upcoming</h3>{" "}
                        {" "}
                    <ul>{[...ctx.missions].map(testRender)}</ul>
                  </div>
                </TabPanel>

                <TabPanel value="2">
                  <div >
                    <h3 className="upcoming-header">Ongoing</h3>{" "}
                        {" "}
                    <ul>{[...ctx.ongoingMissions].map(testRender)}</ul>
                  </div>
                </TabPanel>

                <TabPanel value="3">
                  <div >
                    <h3 className="upcoming-header">Upcoming</h3>{" "}
                        {" "}
                    <ul>{[...ctx.upcomingMissions].map(testRender)}</ul>
                  </div>
                </TabPanel>

          </TabContext>
        </Box>

        {/* <div className="dashboard-upcoming">
          <h3 className="upcoming-header">Next 48 hours</h3>{" "}
          {ctx.upcomingMissions.length > 0 ? (
            <>
            className="dashboard-upcoming"
          <div >
            <h3 className="upcoming-header">Active</h3>{" "}
                {" "}
              <ul>{[...ctx.upcomingMissions].map(renderUpcomingMissions)}</ul>
          </div>

            <div >
              <h3 className="upcoming-header">Next 48 hours</h3>{" "}
                  {" "}
                <ul>{[...ctx.upcomingMissions].map(renderUpcomingMissions)}</ul>
            </div>
            </>
          ) : (
            <div>
              <div className="team-missions" style={{ padding: 10 }}>
                {" "}
                {`None`}{" "}
              </div>
            </div>
          )}
        </div> */}

        <CiTeamStatus />

        <HumintTeamStatus />

        <SigintTeamStatus />
      </div>
    </>
  );
};

export default Dashboard;