import React, { useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const SubmitConop = () => {
  const ctx = useContext(GlobalContext) 
  
  // console.log(ctx.missions)
 

  return <div>SubmitConop</div>;
};

export default SubmitConop;
