<<<<<<< HEAD
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
=======
import React, { useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const Missions = () => {
  const ctx = useContext(GlobalContext) 
  
  // console.log(ctx.missions)
 
>>>>>>> 4f23a15 (changed dashboard to match justin)

  return <div>Missions</div>;
};

export default Missions;
