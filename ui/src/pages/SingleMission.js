import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import SingleMissionMap from "../components/SingleMissionMap";
import { toPoint } from "mgrs";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const SingleMission = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    missionFetch();
    missionsFetch();
  }, []);

  const calendarFormat = (string) => {
    let dateHandler = new Date(string);
    return {
      year: dateHandler.getFullYear(),
      month: dateHandler.getMonth(),
      // add one to the day to convert the format
      day: dateHandler.getDate() + 1,
    };
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

  let coordinates = {};
  let zoom;

  if (ctx.clickedMission.location.country === "Kuwait") {
    coordinates = { lat: 29.34562355852184, lng: 47.67637238617149 };
    zoom = 8;
  } else if (ctx.clickedMission.location.country === "Jordan") {
    coordinates = { lat: 31.00994216931093, lng: 36.6326645727253 };
    zoom = 7;
  } else if (ctx.clickedMission.location.country === "USA") {
    console.log(ctx.clickedMission);
    coordinates = { lat: 35.14147146711656, lng: -79.00823128996466 };
    zoom = 12;
  } else if (ctx.clickedMission.location.country === "Qatar") {
    coordinates = { lat: 25.260281790356256, lng: 51.46267068233816 };
    zoom = 10;
  } else if (ctx.clickedMission.location.country === "Iraq") {
    coordinates = { lat: 33.31491140810114, lng: 44.377725699000514 };
    zoom = 8;
  } else if (ctx.clickedMission.location.country === "Saudi Arabia") {
    coordinates = { lat: 24.062887, lng: 47.561123 };
    zoom = 5;
  } else {
    coordinates = { lat: 32.313793143601366, lng: 55.194812819979404 };
    zoom = 4;
  }

  const missionFetch = async () => {
    setLoading(true);
    await fetch(`http://localhost:8081/missions/${ctx.clickedMission.id}`)
      .then((res) => res.json())
      .then((data) => ctx.setSingleMission(data))
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  // scrolls screen to the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let missionMarkersArray = [];
    ctx.dashboard.forEach((mission) => {
      if (mission.id === ctx.clickedMission.id) {
        missionMarkersArray.push({
          id: mission.title,
          lat: mission.coords[1],
          lng: mission.coords[0],
        });
      }
    }, ctx.setMissionMarkers(missionMarkersArray));
  }, [ctx.dashboard]);



  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  const handleStatusChange = async (event) => {
    let newData = { ...ctx.singleMission[0] };
    newData[event.target.id] = event.target.value;
    ctx.setSingleMission([newData]);
    try {
      let response = await fetch(
        `http://localhost:8081/missions/${ctx.singleMission[0].id}`,
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
    <>
      {loading && <div>Loading Data...</div>}
      {ctx.singleMission[0] && (
        <div className="mission-container">
          <div className="single-mission-map">
            <SingleMissionMap coordinates={coordinates} zoom={zoom} />
          </div>

          <div className="mission-admin-data">
            <Link
              to={`/missions/${ctx.singleMission[0].id}/edit`}
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => {
                ctx.setSubmitConopForm(ctx.singleMission[0]);
              }}
            >
              <h3>ADMIN DATA</h3>
              <Button className="gray-button">Edit CONOP</Button>
              <h3>ADMIN DATA</h3>
              <Button>Edit CONOP</Button>
            </Link>

            <div className="single-mission-status">
              Activity Status:{" "}
              <Form.Group as={Col} md="4">
                <Form.Select
                  md="3"
                  id="status"
                  onChange={(e) => handleStatusChange(e)}
                  value={ctx.singleMission[0].status}
                  aria-label="Default select example"
                >
                  <option>Pending</option>
                  <option>Active</option>
                  <option>Complete</option>
                  <option>Cancelled</option>
                </Form.Select>
              </Form.Group>
            </div>

            
            <p>
              <b>Team:</b> {ctx.singleMission[0].team_name}
            </p>
            <p>
              <b>Name/Activity:</b> {ctx.singleMission[0].name}{" "}
            </p>
            <p>
              <b>Start Date:</b> {ctx.singleMission[0].start_date}{" "}
            </p>
            <p>
              <b>End Date:</b> {ctx.singleMission[0].end_date}{" "}
            </p>
            <p>
              <b>Authority:</b> {ctx.singleMission[0].authority}{" "}
            </p>
            <p>
              <b>Purpose:</b> {ctx.singleMission[0].purpose}{" "}
            </p>
            <p>
              <b>Full Mission Description:</b>{" "}
              {ctx.singleMission[0].description}{" "}
            </p>
            <p>
              <b>End State:</b> {ctx.singleMission[0].end_state}{" "}
            </p>
            <p>
              <b>Transportation Method:</b>{" "}
              {ctx.singleMission[0].transportation_methods}{" "}
            </p>
          </div>
          <div className="mission-timeline">
            <h3>TIMELINE/ROUTE</h3>
            <p>
              <b>SP Time:</b> {ctx.singleMission[0].timeline.departure}{" "}
            </p>
            <p>
              <b>SP Location:</b> {ctx.singleMission[0].timeline.sp}{" "}
            </p>
            <p>
              <b>Mission Arrival:</b>{" "}
              {ctx.singleMission[0].timeline.destination_arrival}{" "}
            </p>
            <p>
              <b>EOM:</b> {ctx.singleMission[0].timeline.eom}{" "}
            </p>
            <p>
              <b>Mission Departure:</b>{" "}
              {ctx.singleMission[0].timeline.destination_departure}{" "}
            </p>
            <p>
              <b>RTB:</b> {ctx.singleMission[0].timeline.rtb}{" "}
            </p>
            <p>
              <b>Mission Duration:</b>{" "}
              {ctx.singleMission[0].timeline.total_time}{" "}
            </p>
          </div>
          <div className="mission-risks">
            <h3>MISSION RISKS</h3>
            <p>
              <b>Risk to Mission:</b> {ctx.singleMission[0].risks.mission}{" "}
            </p>
            <p>
              <b>Risk to Force:</b> {ctx.singleMission[0].risks.force}{" "}
            </p>
          </div>
          <div className="mission-pace">
            <h3>PACE PLAN</h3>
            <p>
              <b>P:</b> {ctx.singleMission[0].pace.P}{" "}
            </p>
            <p>
              <b>A:</b> {ctx.singleMission[0].pace.A}{" "}
            </p>
            <p>
              <b>C:</b> {ctx.singleMission[0].pace.C}{" "}
            </p>
            <p>
              <b>E:</b> {ctx.singleMission[0].pace.E}{" "}
            </p>
          </div>
          <div className="mission-signatures">
            <h3>Notional Approvals</h3>
            <p>
              <b>TODO:</b> RBAC signature system
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleMission;
