import React, { useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const SingleMission = () => {
  const ctx = useContext(GlobalContext) 
  
  // console.log(ctx.missions)
 

  return <div>SingleMission</div>;
};

export default SingleMission;
