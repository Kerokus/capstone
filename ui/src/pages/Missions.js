import React, { useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const Missions = () => {
  const ctx = useContext(GlobalContext) 
  
  // console.log(ctx.missions)
 

  return <div>Missions</div>;
};

export default Missions;
