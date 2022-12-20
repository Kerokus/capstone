import "../styling/navbar.css";
import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { GlobalContext } from "../Context/GlobalContext";
import Image from "react-bootstrap/Image";
import RestoreIcon from '@mui/icons-material/Restore';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

const NavbarComponent = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  return (
    <>
      <div className="nav-position">
        <Row>
          <Navbar className="nav py-" bg="dark" variant="dark">
            <Container className="navbar" position="absolute">
              <Navbar.Brand className="webpage-title" as={Link} to="/">
                <Image
                  className="nav-logo"
                  src="/toms-logo.png"
                  style={{ height: 75, width: 200 }}
                  onClick={() => {
                    toggleRefresh()
                  }}
                />
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
                <Nav.Link
                  className="personnel"
                  as={Link}
                  to="/conop"
                ></Nav.Link>
                <Nav.Link className="archives-link" as={Link} to="/archives">
                  <EventRepeatIcon className="historical-data"></EventRepeatIcon>

                  {/* <RestoreIcon></RestoreIcon> */}
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Row>
      </div>
    </>
  );
};

export default NavbarComponent;
