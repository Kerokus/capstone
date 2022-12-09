import React, { useState, useEffect, useContext } from "react";
// import { toPoint } from "mgrs";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const HumintTeamStatus = () => {
    const ctx = useContext(GlobalContext);
    
  return (
    <div>This is the HUMINT Team Statuses.</div>
  )
};

export default HumintTeamStatus;