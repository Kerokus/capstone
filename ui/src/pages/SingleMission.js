import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const SingleMission = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    missionFetch();
  }, []);

  const missionFetch = async () => {
    setLoading(true);
    await fetch(`http://localhost:8081/missions/2`)
      .then((res) => res.json())
      .then((data) => ctx.setSingleMission(data))
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  return (
    <>
      {loading && <div>Loading Data...</div>}
      {ctx.singleMission[0] && (
        <div className="mission-container">
          <div className="mission-map">
            <h3>MAP GOES HERE</h3>
          </div>
          <div className="mission-admin-data">
            <h3>ADMIN DATA</h3>
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
              <b>Purpose:</b> {ctx.singleMission[0].purpose}{" "}
            </p>
            <p>
              <b>Authority:</b> {ctx.singleMission[0].authority}{" "}
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
