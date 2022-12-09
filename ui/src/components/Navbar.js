

import '../styling/navbar.css'
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <>
      <Navbar className='nav'bg="dark" variant="dark">
        <Container className='navbar'>
          <Navbar.Brand className='webpage-title' as={Link} to="/">
            Deployed Personnel Accountability System
          </Navbar.Brand>
          <Nav className="me-right">
            <Nav.Link className='missions'as={Link} to="/missions">
              Missions
            </Nav.Link>
            <Nav.Link className='teams'as={Link} to="/teams">
              Teams
            </Nav.Link>
            <Nav.Link className='personnel'as={Link} to="/personnel">
              Personnel
            </Nav.Link>
            <Nav.Link className='personnel'as={Link} to="/conop">
              Submit Conop
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent