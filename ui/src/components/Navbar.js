import "../styling/navbar.css";
import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Clock from "react-live-clock";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import DigitalClock from "./DigitalClock";
import ArchiveIcon from "@mui/icons-material/Archive";

const NavbarComponent = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Row>
        <Navbar className="nav" bg="dark" variant="dark">
          <Container className="navbar" position="absolute">
          
            <Navbar.Brand className="webpage-title" as={Link} to="/">
              
            {/* <img src="../../public/LOGO.png" alt="" width="36" height="36"/> */}
            
            
              Theater Operations Management System
            </Navbar.Brand>
            <Nav className="me-right">
              <Nav.Link className="missions" as={Link} to="/missions">
                Missions
              </Nav.Link>
              <Nav.Link className="teams" as={Link} to="/teams">
                Teams
              </Nav.Link>
              <Nav.Link className="personnel" as={Link} to="/personnel">
                Personnel
              </Nav.Link>
              <Nav.Link className="personnel" as={Link} to="/conop">
                Submit Conop
              </Nav.Link>
              <Nav.Link className="personnel" as={Link} to="/conop"></Nav.Link>
              <Nav.Link className="personnel" as={Link} to="/conop">
                <ArchiveIcon></ArchiveIcon>
              </Nav.Link>
            </Nav>

            {/* <Nav className="me-bottom"><DigitalClock/></Nav> */}
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <div className="clock-left">
            <Clock
              className="dashboard-clock"
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"US/Eastern"}
            />
            <p>Ft. Gordon, GA</p>
          </div>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <div className="clock-center">
            <Clock
              className="dashboard-clock"
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"zulu"}
            />
            <p>Zulu</p>
          </div>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <div className="clock-right">
            <Clock
              className="dashboard-clock"
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"Asia/Kuwait"}
            />
            <p>Kuwait City</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default NavbarComponent;
