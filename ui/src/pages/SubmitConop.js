import React, { useState, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

//submitConopForm, setSubmitConopForm

const SubmitConop = () => {
  const ctx = useContext(GlobalContext);

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
    console.log(ctx.submitConopForm);
  };

  return (
    <div className="submit-conop-container">
      <h1>Submit Conop</h1>
      <p></p>
      <Container>
        <Row>
          <Col>
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
          </Col>
          <Col>
            <h3>Location:</h3>
            <Form.Label>MGRS</Form.Label>
            <Form.Group as={Col} md="5">
              <InputGroup hasValidation>
                <Form.Control
                  id="mgrs"
                  onChange={(e) => handleFormData(e, "location")}
                  value={ctx.submitConopForm.location?.mgrs || ""}
                  type="text"
                  minLength={"13"}
                  maxLength={"17"}
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
          </Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </div>
  );
};

export default SubmitConop;
