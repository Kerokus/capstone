import React, { useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";



const Teams = () => {
  const ctx = useContext(GlobalContext) 
  
  // console.log(ctx.missions)
 
  return <div>Teams</div>;
};

export default Teams;
