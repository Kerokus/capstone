import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import Card from "react-bootstrap/Card";
import TeamMap from "../components/TeamMap";

import "../styling/missions.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const Teams = () => {
  const ctx = useContext(GlobalContext);
  const [teamSearchTerm, setTeamSearchTerm] = useState("");
  const [filteredTeamData, setFilteredTeamData] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    ctx.setShow(false);
    ctx.setShowWarning(false);
    ctx.setFormData({});
    ctx.setTeamMarkers([]);
  }, []);

    // scrolls screen to the top when the component is mounted
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  useEffect(() => {
    setFilteredTeamData(ctx.teams);
  }, [ctx.teams]);

  //// Search Functions////
  // ctx.sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
    setTeamSearchTerm(event.target.value);
  };

  //Filters the data without having to select a "Search By" Category
  useEffect(() => {
    let searchArray = [];
    ctx.teams.forEach((team) => {
      let teamDataString = JSON.stringify(team);
      if (teamDataString.toLowerCase().includes(teamSearchTerm.toLowerCase())) {
        if (
          searchArray.filter((item) => {
            return item.id === team.id;
          }).length === 0
        ) {
          searchArray.push(team);
        }
      }
      setFilteredTeamData(searchArray);
    });
  }, [teamSearchTerm]);

  //DELETE mission from database
  const handleDelete = async () => {
    try {
      let response = await fetch(
        `http://localhost:8081/teams/${ctx.clickedTeam.id}`,
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

  // add team stuff

  //Close "Add personnel" form
  const handleClose = () => {
    setValidated(false);
    ctx.setShow(false);
    ctx.setFormData({});
  };

  //ADD new personnel / EDIT existing personnel
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      event.preventDefault();
      let response = await fetch("http://localhost:8081/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ctx.formData),
      });
      ctx.setFormData({});
      setValidated(false);
      handleClose();
      toggleRefresh();
      if (response.status !== 201) {
        throw new Error();
      }
    }
  };

  //ctx.set state for the "Add personnel" form
  const handleFormData = (event, nestedObject) => {
    let newData = { ...ctx.formData };
    if (nestedObject) {
      newData[nestedObject] = {
        ...newData[nestedObject],
        [event.target.id]: event.target.value,
      };
    } else {
      newData[event.target.id] = event.target.value;
    }
    ctx.setFormData(newData);
    console.log(ctx.formData);
  };

  const handleAdd = () => {
    setValidated(false);
    handleShow();
  };

  //Open "Personnel" form
  const handleShow = () => ctx.setShow(true);

  const renderTeamCard = (team, index) => {
    var coordinates = {};
    var zoom;
    //console.log("flag:",team)
    if (team.location.country === "Kuwait") {
      coordinates = { lat: 29.34852700252181, lng: 47.46561436349371 };
      zoom = 7;
    } else if (team.location.country === "Jordan") {
      coordinates = { lat: 31.261837409143272, lng: 36.740018930765636 };
      zoom = 6;
    } else if (team.location.country === "USA") {
      coordinates = { lat: 33.411867719890346, lng: -82.04860551242295 };
      zoom = 9;
    } else if (team.location.country === "Saudi Arabia") {
      coordinates = { lat: 23.66644483894103, lng: 45.145512699263534 };
      zoom = 5;
    } else if (team.location.country === "Qatar") {
      coordinates = { lat: 25.253654783876964, lng: 51.2066182649342 };
      zoom = 8;
    } else if (team.location.country === "Iraq") {
      coordinates = { lat: 33.12531111219817, lng: 43.42720100219237 };
      zoom = 5;
    } else{
      coordinates = { lat: 33.42643305816639, lng: -82.0571350866326 };
      zoom = 9;
    }

    return (
      <Card
        border="light"
        style={{ width: "18rem" }}
        key={index}
        bg="dark"
        text="white"
        className="mission-card"
      >
        <Card.Header className="team-render-title">
          {" "}
          {team.team_name}{" "}
        </Card.Header>
        <Card.Body className="card-body">
          <div className="test" key={index}>
            <div className="team-map">
              {" "}
              <TeamMap coordinates={coordinates} zoom={zoom} />
            </div>
            <div className="team-location-data">
              <u> Current Location: </u>
              <p>{`${team.location.country} - ${team.location.city_base}`}</p>
            </div>
            <div className="asd"></div>
          </div>

          <div className="buttons">
            <Link
              to={`/teams/${team.id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              <Button
                variant="secondary"
                onClick={() => ctx.setClickedTeam(team)}
              >
                Team Info
              </Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => {
                ctx.setClickedTeam(team);
                handleShowWarning();
              }}
            >
              Delete Team
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="teams-container">
      <div className="nav-buttons">
        <Button className="add-mission" variant="success" onClick={handleAdd}>
          Add Team
        </Button>

        <div className="mission-search">
          <input
            className="mission-search-bar"
            type="text"
            placeholder="Search Teams"
            onChange={(event) => {
              handleSearch(event);
            }}
            value={teamSearchTerm}
          />
        </div>

        <Link className="homepage-button-personnel" to="/">
          <Button variant="primary" className="homepage-button">
            Back to Home
          </Button>
        </Link>
      </div>
      <h1 className ="total-counter">Total Teams: {ctx.teams.length}</h1>

      <div className="mission-card-container">
        {[...filteredTeamData].map(renderTeamCard)}
      </div>

      <Modal
        show={ctx.showWarning}
        onHide={handleCloseWarning}
        backdrop="static"
        keyboard={false}
        // className="modal-main"
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

      <Modal
        show={ctx.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="5">
                <Form.Label>Team Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id="team_name"
                    onChange={(e) => handleFormData(e)}
                    value={ctx.formData.team_name || ""}
                    required
                    type="text"
                    placeholder="Team Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter Team Name
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="5">
                <Form.Label>Country</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id="country"
                    onChange={(e) => handleFormData(e, "location")}
                    value={ctx.formData.location?.country || ""}
                    required
                    type="text"
                    placeholder="Country Location"
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter country location
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} md="5">
                  <Form.Label>City/Base</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      id="city_base"
                      onChange={(e) => handleFormData(e, "location")}
                      value={ctx.formData.location?.city_base || ""}
                      required
                      type="text"
                      placeholder="City or Base"
                    />
                    <Form.Control.Feedback type="invalid">
                      Enter city or base location
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Form.Group as={Col} md="3">
                <Form.Label>Comms Status</Form.Label>
                <Form.Select
                  id="comms_status"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.comms_status || ""}
                  required
                  aria-label="Default select example"
                >
                  <option></option>
                  <option>Green</option>
                  <option>Yellow</option>
                  <option>Red</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Personnel Status</Form.Label>
                <Form.Select
                  id="personnel_status"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.personnel_status || ""}
                  required
                  aria-label="Default select example"
                >
                  <option></option>
                  <option>Green</option>
                  <option>Yellow</option>
                  <option>Red</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Equipment Status</Form.Label>
                <Form.Select
                  id="equipment_status"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.equipment_status || ""}
                  required
                  aria-label="Default select example"
                >
                  <option></option>
                  <option>Green</option>
                  <option>Yellow</option>
                  <option>Red</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3"></Row>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="green-button" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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
            className= "red-button"
            onClick={() => {
              handleDelete();
              ctx.setSearchTerm("");
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Teams;
