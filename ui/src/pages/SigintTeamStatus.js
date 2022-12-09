import React, { useState, useEffect, useContext } from "react";
// import { toPoint } from "mgrs";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const SigintTeamStatus = () => {
    const ctx = useContext(GlobalContext);
  return (
    <div>This is the SIGINT Team Statuses.</div>
  )
};

export default SigintTeamStatus;