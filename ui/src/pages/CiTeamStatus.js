import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const CiTeamStatus = () => {
  const ctx = useContext(GlobalContext);
  

  
  
  // pushes all teams with 'CI' in their name to the ciTeams array
  useEffect(() => {
    let ciTeamsArray = [];
    for (let i = 0; i < ctx.teams.length; i++){
      let team_name = (ctx.teams[i].team_name).toUpperCase()
      if (team_name.includes('CI')) {
        ciTeamsArray.push(ctx.teams[i])
      }
      ctx.setCiTeams(ciTeamsArray)
    }
  }, [ctx.teams.length])

  // pushes all CI teams that have any non green statuses (comms, personnel, equipment) to the nonGreenTeams array
  useEffect(() => {
    let greenCiTeams = [];
    let yellowCiTeams = [];
    let redCiTeams = [];
      for(let i = 0; i <= ctx.ciTeams.length - 1; i++) {
        let comms_status = (ctx.ciTeams[i].comms_status).toUpperCase()
        let personnel_status = (ctx.ciTeams[i].personnel_status).toUpperCase()
        let equipment_status = (ctx.ciTeams[i].equipment_status).toUpperCase()
        if (comms_status === 'RED' || personnel_status === 'RED' || equipment_status === 'RED') {
          redCiTeams.push(ctx.ciTeams[i].team_name)
          ctx.setRedCiTeams(redCiTeams)
        } else if (comms_status === 'YELLOW' || personnel_status === 'YELLOW' || equipment_status === 'YELLOW') {
          yellowCiTeams.push(ctx.ciTeams[i].team_name)
          ctx.setYellowCiTeams(yellowCiTeams)
        } else {
          greenCiTeams.push(ctx.ciTeams[i].team_name)
          ctx.setGreenCiTeams(greenCiTeams)
        }
      }
  }, [ctx.ciTeams])

  

 

  
  const test = (color) => {
    if (color === 'red') {
       ctx.redCiTeams.map((team, index) => {
        console.log(`${team}`)
       return <div className="index" key={index}>{team}</div>
     })
   } 
 } 



  return (
    <>
      <h3 className="team-status-header">CI Teams Status:</h3>

    <div className="ci_status_container">
      <div className="red_teams">{ctx.redCiTeams.map((team, index) => {
        return <div key={index}>{team}</div>})} 
      </div>
      <div className="yellow_teams">{ctx.yellowCiTeams.map((team, index) => {
        return <div key={index}>{team}</div>})} 
      </div>
      <div className="green_teams">{ctx.greenCiTeams.map((team, index) => {
        return <div key={index}>{team}</div>})} 
      </div>
    </div>
    </>
  )
};

export default CiTeamStatus;