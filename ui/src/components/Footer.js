import '../styling/footer.css'
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <p className='developers'>Developers: Justin King, Jeff Noland, Riyaad Mohmamed, and Katrina Hill</p>
        <p className='copyright'>Copyright 2022 Galvanize</p>
      </div>
    </>
  );
}

export default Footer