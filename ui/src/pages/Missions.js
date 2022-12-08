import React, { useState, useEffect } from "react";
import { toPoint } from "mgrs";

const Missions = () => {
  const [latLong, setLatLong] = useState([]);

  useEffect(() => {
    setLatLong(coordTest());
  }, []);

  const coordTest = () => {
    let inputString = "14SQH05239974";
    return toPoint(inputString);
  };

  return <div>Missions</div>;
};

export default Missions;
