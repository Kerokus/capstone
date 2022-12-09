import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const CiTeamStatus = () => {
  const ctx = useContext(GlobalContext);
  let ciTeams = [];
  let greenStatusTeams = [];
  let yellowStatusTeams = [];
  let redStatusTeams = [];
  
  // pushes all teams with 'CI' in their name to the ciTeams array
  for (let i = 0; i < ctx.teams.length; i++){
    let team_name = (ctx.teams[i].team_name).toUpperCase()
    if (team_name.includes('CI')) {
      ciTeams.push(ctx.teams[i])
    }
  }

  // pushes all CI teams that have any non green statuses (comms, personnel, equipment) to the nonGreenTeams array
  useEffect(() => {
    if(ciTeams) {
      for(let i = 0; i <= ciTeams.length - 1; i++) {
        let comms_status = (ciTeams[i].comms_status).toUpperCase()
        let personnel_status = (ciTeams[i].personnel_status).toUpperCase()
        let equipment_status = (ciTeams[i].equipment_status).toUpperCase()
        if (comms_status === 'RED' || personnel_status === 'RED' || equipment_status === 'RED') {
          redStatusTeams.push(ciTeams[i].team_name)
        } else if (comms_status === 'YELLOW' || personnel_status === 'YELLOW' || equipment_status === 'YELLOW') {
          yellowStatusTeams.push(ciTeams[i].team_name)
        } else {
          greenStatusTeams.push(ciTeams[i].team_name)
        }
      }
      // console.log("Red Status: ", redStatusTeams)
      // console.log("Yellow Status: ", yellowStatusTeams)
      // console.log("Green Status: ", greenStatusTeams)
    }
  }, [ciTeams])

  
    // const test = (color) => {
    //    if (color === 'red') {
    //      console.log(redStatusTeams)
    //       redStatusTeams.map((team, index) => {
    //       console.log(color)
    //       return <div className="index">'a'</div>
    //     })
    //   } 
    // }
 


  return (
    <>
    <div>CI Team Statuses: </div>
    {(ciTeams.length !== 0) ? 
    <>
    <div className="red_teams">RED - {redStatusTeams.map((team, index) => {
      return <p>{team}</p>
    })} </div>
    <div className="yellow_teams">YELLOW - </div>
    <div className="green_teams">GREEN -  </div>
    </> :
    <div>Loading...</div>
    }
    </>
  )
};

export default CiTeamStatus;