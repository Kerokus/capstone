import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import Clock from "react-live-clock";
import "../styling/navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const DigitalClock = () => {

  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);



  return (
    <>
    <Navbar className="digital-container-clock" bg="dark" variant="dark">
    <Container className="digital-clock" >
    <Nav className ="header-clock" >      
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
    </div>
    </Nav>
    </Container>
      </Navbar>
    </>
  )
}

export default DigitalClock


// (

    
//   <div className ="header-clock">      
//     {loading && <div>Loading Data...</div>}
//   <div className="clocks-container">
//     <div className="clock-left">
//       <Clock
//         className="dashboard-clock"
//         format={"HH:mm:ss"}
//         ticking={true}
//         timezone={"US/Eastern"}
//       />
//       <p>Ft. Gordon, GA</p>
//     </div>
//     <div className="clock-center">
//       <div className="clock-left">
//         <Clock
//           className="dashboard-clock"
//           format={"HH:mm:ss"}
//           ticking={true}
//           timezone={"zulu"}
//         />
//         <p>Zulu</p>
//       </div>
//     </div>
//     <div className="clock-right">
//       <div className="clock-left">
//         <Clock
//           className="dashboard-clock"
//           format={"HH:mm:ss"}
//           ticking={true}
//           timezone={"Asia/Kuwait"}
//         />
//         <p>Kuwait City</p>
//       </div>
//     </div>
//   </div>
//   </div>
// )