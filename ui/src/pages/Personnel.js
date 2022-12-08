import React, { useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const Personnel = () => {
  const ctx = useContext(GlobalContext) 
  
  // console.log(ctx.missions)
 

  return <div>Personnel</div>;
};

export default Personnel;
