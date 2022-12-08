import React, { useState, useEffect, useContext } from "react";
import { toPoint } from "mgrs";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const Missions = () => {
  const ctx = useContext(GlobalContext);

  useEffect(() => {
    ctx.setLatLong(coordTest());
  }, []);

  const coordTest = () => {
    let inputString = "14SQH05239974";
    return toPoint(inputString);
  };
};

export default Missions;
