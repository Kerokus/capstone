import "../styling/navbar.css";
import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Clock from "react-live-clock";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const NavbarComponent = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar className="nav" bg="dark" variant="dark">
        <Container className="navbar">
          <Navbar.Brand className="webpage-title" as={Link} to="/">
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
          </Nav>
        </Container>
        <div className ="header-clock">      
      {loading && <div>Loading Data...</div>}
    <div className="clocks-container">
      <div className="clock-left">
        <Clock
          className="dashboard-clock"
          format={"HH:mm:ss"}
          ticking={true}
          timezone={"US/Eastern"}
        />
        <p>Ft. Gordon, GA</p>
      </div>
      <div className="clock-center">
        <div className="clock-left">
          <Clock
            className="dashboard-clock"
            format={"HH:mm:ss"}
            ticking={true}
            timezone={"zulu"}
          />
          <p>Zulu</p>
        </div>
      </div>
      <div className="clock-right">
        <div className="clock-left">
          <Clock
            className="dashboard-clock"
            format={"HH:mm:ss"}
            ticking={true}
            timezone={"Asia/Kuwait"}
          />
          <p>Kuwait City</p>
        </div>
      </div>
    </div></div>
      </Navbar>

    </>
  );
};

export default NavbarComponent;
