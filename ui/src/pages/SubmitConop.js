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
  const handleFormData = (event, nestedKey) => {
    let newData = { ...ctx.submitConopForm };
    if (nestedKey) {
      newData[nestedKey] = {
        ...newData[nestedKey],
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
              <Form.Label>Mission Start Date</Form.Label>
              <Form.Control
                id="end_date"
                onChange={(e) => handleFormData(e)}
                value={ctx.submitConopForm.end_date || ""}
                type="date"
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter Mission Start Date.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <h3>Location:</h3>
            <Form.Group as={Col} md="3">
              <Form.Label>MGRS</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  id="mgrs"
                  onChange={(e) => handleFormData(e, "location")}
                  value={ctx.submitConopForm.location?.mgrs || ""}
                  className="formMGRS"
                  type="text"
                  minLength={"6"}
                  maxLength={"12"}
                  placeholder="MGRS"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a three-letter rank.
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
