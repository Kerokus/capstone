import React, { useContext, useEffect, useState } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import Card from "react-bootstrap/Card";
import "../styling/missions.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Places from "../components/Map";
import MissionMap from "../components/MissionMap"


const Missions = () => {
  const ctx = useContext(GlobalContext);
  const [missionSearchTerm, setMissionSearchTerm] = useState("");
  const [filteredMissionData, setFilteredMissionData] = useState("");

  useEffect(() => {
    ctx.setShow(false);
    ctx.setTeamMarkers([]);
    ctx.setMissionMarkers([]);
  }, []);

  useEffect(() => {
    setFilteredMissionData(ctx.missions);
  }, [ctx.missions]);

  //// Search Functions////
  // ctx.sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
    setMissionSearchTerm(event.target.value);
  };

  //Filters the data without having to select a "Search By" Category
  useEffect(() => {
    let searchArray = [];
    ctx.missions.forEach((mission) => {
      let missionDataString = JSON.stringify(mission);
      if (
        missionDataString
          .toLowerCase()
          .includes(missionSearchTerm.toLowerCase())
      ) {
        if (
          searchArray.filter((item) => {
            return item.id === mission.id;
          }).length === 0
        ) {
          searchArray.push(mission);
        }
      }
      setFilteredMissionData(searchArray);
    });
  }, [missionSearchTerm]);

  //DELETE mission from database
  const handleDelete = async () => {
    try {
      let response = await fetch(
        `http://localhost:8081/missions/${ctx.clickedMission.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleCloseWarning();
      toggleRefresh();
      if (response.status !== 202) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  //DELETE Confirmation Warnings
  const handleCloseWarning = () => {
    ctx.setShowWarning(false);
  };

  const handleShowWarning = () => {
    ctx.setShowWarning(true);
  };

  const renderMissionCard = (mission, index) => {
    var coordinates = {};
    let zoom;
    //console.log("flag:",team)
    if (mission.location.country === "Kuwait") {
      coordinates = { lat: 29.34852700252181, lng: 47.46561436349371 };
      zoom = 7
    } else if (mission.location.country === "Jordan") {
      coordinates = { lat: 31.261837409143272, lng: 36.740018930765636 };
      zoom = 6
    } else if (mission.location.country === "USA") {
      coordinates = { lat: 35.14193183877861, lng: -78.99943678131243 };
      zoom = 11
    } else if (mission.location.country === "Qatar") {
      coordinates = { lat: 25.253654783876964, lng: 51.2066182649342 };
      zoom = 8
    } else if (mission.location.country === "Iraq") {
      coordinates = { lat: 36.230501, lng: 43.956688 };
      zoom = 6
    } else {
      coordinates = { lat: 32.69215511648702, lng: 43.645439965585325 };
      zoom = 3
    }

    // const countries = [
    //   { name: 'Saudi Arabia',
    //   location: {lat:24.689868, lng:46.735424}},
    //   { name: 'Kuwait',
    //   location: {lat:28.871513, lng:48.163907}},
    //   { name: 'Jordan',
    //   location: {lat:31.967195, lng:35.910519}},
    //   { name: 'Iraq',
    //   location: {lat:36.230501, lng:43.956688}},
    //   { name: 'Bahrain',
    //   location: {lat:26.267288, lng:50.632467}},
    //   { name: 'United Arab Emirates',
    //   location: {lat:24.441709, lng:54.377948}},
    //   { name: 'Qatar',
    //   location: {lat:25.276280, lng:51.525105}},
    // ]

    // //else {
    //   coordinates = { lat: 48.8566, lng: 2.3522 };
    // }
    return (
      <Card
        border="light"
        style={{ width: "18rem" }}
        key={index}
        bg="dark"
        text="white"
        className="mission-card"
      >
        <Card.Header>
          {" "}
          {`${mission.name} - ${mission.status.toUpperCase()}`}{" "}
        </Card.Header>
        <Card.Body className="card-body">
          <div className="test" key={index}>
            <div className="missions-map">
              <MissionMap coordinates={coordinates} zoom={zoom} />
            </div>
            <div className="mission-data">
              <u> Location: </u>
              <p>{`${mission.location.country} - ${mission.location.city_base}`}</p>
              <u> Decision Point: </u>
              <p>{`${mission.decision_point}`}</p>
            </div>
            <div classname="asd"></div>
          </div>
          <div className="buttons">
            <Link
              to={`/missions/${mission.id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              <Button
                variant="secondary"
                onClick={() => ctx.setClickedMission(mission)}
              >
                Mission Info
              </Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => {
                ctx.setClickedMission(mission);
                handleShowWarning();
              }}
            >
              Delete Mission
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <div className="missions-page-container">
        <div className="nav-buttons">
          <Link className="submit-conop-link" to="/conop">
            <Button className="add-mission" variant="success">
              Submit CONOP
            </Button>
          </Link>

          <div className="mission-search">
            <input
              className="mission-search-bar"
              type="text"
              placeholder="Search Missions"
              onChange={(event) => {
                handleSearch(event);
              }}
              value={missionSearchTerm}
            />
          </div>

          <Link className="homepage-link" to="/">
            <Button variant="primary" className="homepage-button">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mission-card-container">
          {[...filteredMissionData].map(renderMissionCard)}
        </div>
      </div>

      <Modal
        show={ctx.showWarning}
        onHide={handleCloseWarning}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>CONFIRM</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to delete this entry?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarning}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              handleDelete();
              ctx.setSearchTerm("");
              toggleRefresh();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Missions;
