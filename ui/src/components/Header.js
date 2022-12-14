import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import Clock from "react-live-clock";

// import HumintTeamStatus from "./HumintTeamStatus";
// import SigintTeamStatus from "./SigintTeamStatus";
import { toPoint } from "mgrs";

const Header = () => {
  const ctx = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);


  return (

    <div>
          {/* <div className ="header-clock">      
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
      </div> */}
    </div>
  )
}

export default Header    

