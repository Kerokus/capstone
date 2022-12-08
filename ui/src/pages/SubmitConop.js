import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SubmitConop = () => {
  const [submitFormData, setSubmitFormData] = useState({});
  const [validated, setValidated] = useState(false);

  //Set state for the form fields
  const handleFormData = (event) => {
    let newData = { ...submitFormData };
    newData[event.target.id] = event.target.value;
    setSubmitFormData(newData);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="submit-form-container">
      <h1>Submit CONOP</h1>
      <Container>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
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
