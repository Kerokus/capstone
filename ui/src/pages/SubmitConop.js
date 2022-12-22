import React, { useState, useContext, useEffect } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import config from './config'
//submitConopForm, setSubmitConopForm

const SubmitConop = () => {
  const ctx = useContext(GlobalContext);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    ctx.setSubmitConopForm({});
  }, [])

  //DATA HANDLERS
  const handleFormData = (event, nestedObject) => {
    let newData = { ...ctx.submitConopForm };
    if (nestedObject) {
      newData[nestedObject] = {
        ...newData[nestedObject],
        [event.target.id]: event.target.value,
      };
    } else {
      newData[event.target.id] = event.target.value;
    }
    ctx.setSubmitConopForm(newData);
  };

  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  //Clears the form data
  const handleClear = () => {
    ctx.setSubmitConopForm({});
    setValidated(false);
  };

  //ADD new CONOP
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      event.preventDefault();
      let response = await fetch((ApiUrl + "/missions"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ctx.submitConopForm),
      });
      ctx.setSubmitConopForm({});
      setValidated(false);
      if (response.status !== 201) {
        throw new Error();
      }
    }
  };

  return (
    <>
    <div className="submit-conop-container">
      <h1>Submit CONOP</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="submit-buttons-container">
          <Button
            className="conop-clear-button"
            variant="secondary"
            onClick={handleClear}
          >
            Clear Form
          </Button>
          <Link to={`/`} style={{ color: "white", textDecoration: "none" }}>
            <Button
              className="conop-cancel-button"
              variant="warning"
              onClick={toggleRefresh}
            >
              Cancel
            </Button>
          </Link>


          <Button type="submit" className="green-button-1" variant='success'>

            Submit
          </Button>
        </div>

        <p></p>
        <Row>
          <Col>
            <h3>Admin Data</h3>
            <Form.Group as={Col} md="3">
              <Form.Label>Team Name</Form.Label>
              <Form.Select
                id="team_id"
                onChange={(e) => handleFormData(e)}
                value={ctx.submitConopForm.team_id || ""}
                aria-label="Default select example"
              >
                <option>Select</option>
                {ctx.teamData.map((team) => {
                  return (
                    <option value={team.id} key={team.id}>
                      {team.team_name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a team name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label>OP Name or Activity type</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="name"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.submitConopForm.name || ""}
                  type="text"
                  placeholder="Name or Type of Activity"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter an operation name or describe activity
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Authority</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="authority"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.submitConopForm.authority || ""}
                  type="text"
                  placeholder="Authorizing info"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter authority information
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Mission Start Date</Form.Label>
              <Form.Control
                id="start_date"
                onChange={(e) => handleFormData(e)}
                value={ctx.submitConopForm.start_date || ""}
                type="date"
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter Mission Start Date.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Mission End Date</Form.Label>
              <Form.Control
                id="end_date"
                onChange={(e) => handleFormData(e)}
                value={ctx.submitConopForm.end_date || ""}
                type="date"
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter Mission End Date.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Decision Point</Form.Label>
              <Form.Control
                id="decision_point"
                onChange={(e) => handleFormData(e)}
                value={ctx.submitConopForm.decision_point || ""}
                type="date"
                required
              />
              <Form.Control.Feedback type="invalid">
                Mission decision point
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <h3>Location and Transportation</h3>
            <Form.Label>MGRS</Form.Label>
            <Form.Group as={Col} md="5">
              <InputGroup hasValidation>
                <Form.Control
                  id="mgrs"
                  onChange={(e) => handleFormData(e, "location")}
                  value={ctx.submitConopForm.location?.mgrs || ""}
                  type="text"
                  minLength={"13"}
                  maxLength={"18"}
                  placeholder="MGRS"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter an 8 to 12 digit MGRS Grid
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Group as={Col} md="5">
              <InputGroup hasValidation>
                <Form.Control
                  id="country"
                  onChange={(e) => handleFormData(e, "location")}
                  value={ctx.submitConopForm.location?.country || ""}
                  type="text"
                  placeholder="Enter Country Name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a country name
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>City / Base</Form.Label>
            <Form.Group as={Col} md="5">
              <InputGroup hasValidation>
                <Form.Control
                  id="city_base"
                  onChange={(e) => handleFormData(e, "location")}
                  value={ctx.submitConopForm.location?.city_base || ""}
                  type="text"
                  placeholder="City/Base"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a city or base location
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Transportation Methods</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="transportation_methods"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.submitConopForm.transportation_methods || ""}
                  type="text"
                  placeholder="Transportation Methods"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  How will you travel to and from the destination?
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Form.Label>Purpose</Form.Label>
          <Form.Group as={Col} md="10">
            <InputGroup hasValidation>
              <Form.Control
                id="purpose"
                onChange={(e) => handleFormData(e)}
                value={ctx.submitConopForm.purpose || ""}
                type="text"
                as="textarea"
                placeholder="Purpose"
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter the purpose of this activity
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Label>Full Mission Description</Form.Label>
          <Form.Group as={Col} md="10">
            <InputGroup hasValidation>
              <Form.Control
                id="description"
                onChange={(e) => handleFormData(e)}
                value={ctx.submitConopForm.description || ""}
                type="text"
                as="textarea"
                placeholder="Describe what you will be doing..."
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter mission description
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Label>Mission Endstate</Form.Label>
          <Form.Group as={Col} md="10">
            <InputGroup hasValidation>
              <Form.Control
                id="end_state"
                onChange={(e) => handleFormData(e)}
                value={ctx.submitConopForm.end_state || ""}
                type="text"
                as="textarea"
                placeholder="Mission endstate..."
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter mission endstate
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row>
          <Col className="conop-timeline-group">
            <h3>Timeline and CPs</h3>
            <Form.Label>SP Location</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="sp"
                  onChange={(e) => handleFormData(e, "timeline")}
                  value={ctx.submitConopForm.timeline?.sp || ""}
                  type="text"
                  placeholder="SP Location"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a start location
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>CP 1</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="cp1"
                  onChange={(e) => handleFormData(e, "timeline")}
                  value={ctx.submitConopForm.timeline?.cp1 || ""}
                  type="text"
                  placeholder="CP1"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  CP1 info required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>CP 2</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="cp2"
                  onChange={(e) => handleFormData(e, "timeline")}
                  value={ctx.submitConopForm.timeline?.cp2 || ""}
                  type="text"
                  placeholder="CP2"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  CP2 info required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>SP Departure Time</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="departure"
                  onChange={(e) => handleFormData(e, "timeline")}
                  value={ctx.submitConopForm.timeline?.departure || ""}
                  type="time"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter departure time
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Mission Arrival Time</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="destination_arrival"
                  onChange={(e) => handleFormData(e, "timeline")}
                  value={
                    ctx.submitConopForm.timeline?.destination_arrival || ""
                  }
                  type="time"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter arrvial time
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>End of Mission</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="eom"
                  onChange={(e) => handleFormData(e, "timeline")}
                  value={ctx.submitConopForm.timeline?.eom || ""}
                  type="time"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter EOM time
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Mission Departure Time</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="destination_departure"
                  onChange={(e) => handleFormData(e, "timeline")}
                  value={
                    ctx.submitConopForm.timeline?.destination_departure || ""
                  }
                  type="time"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter mission departure time
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>RTB Time</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="rtb"
                  onChange={(e) => handleFormData(e, "timeline")}
                  value={ctx.submitConopForm.timeline?.rtb || ""}
                  type="time"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter RTB time
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Mission Duration</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="total_time"
                  onChange={(e) => handleFormData(e, "timeline")}
                  value={ctx.submitConopForm.timeline?.total_time || ""}
                  type="text"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Total mission duration?
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <h3>PACE Plan</h3>
            <Form.Label>Primary</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="P"
                  onChange={(e) => handleFormData(e, "pace")}
                  value={ctx.submitConopForm.pace?.P || ""}
                  type="text"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Primary Comms method
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Alternate</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="A"
                  onChange={(e) => handleFormData(e, "pace")}
                  value={ctx.submitConopForm.pace?.A || ""}
                  type="text"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Alternate Comms method
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Contingency</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="C"
                  onChange={(e) => handleFormData(e, "pace")}
                  value={ctx.submitConopForm.pace?.C || ""}
                  type="text"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Contingency Comms method
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Emergency</Form.Label>
            <Form.Group as={Col} md="6">
              <InputGroup hasValidation>
                <Form.Control
                  id="E"
                  onChange={(e) => handleFormData(e, "pace")}
                  value={ctx.submitConopForm.pace?.E || ""}
                  type="text"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Emergency Comms method
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <h3>Risks</h3>
            <Form.Label>Risks to Force</Form.Label>
            <Form.Group as={Col} md="8">
              <InputGroup hasValidation>
                <Form.Control
                  id="force"
                  onChange={(e) => handleFormData(e, "risks")}
                  value={ctx.submitConopForm.risks?.force || ""}
                  type="text"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Risks to force?
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Label>Risks to Mission</Form.Label>
            <Form.Group as={Col} md="8">
              <InputGroup hasValidation>
                <Form.Control
                  id="mission"
                  onChange={(e) => handleFormData(e, "risks")}
                  value={ctx.submitConopForm.risks?.mission || ""}
                  type="text"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Risks to mission?
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
    </>
  );
};

export default SubmitConop;
