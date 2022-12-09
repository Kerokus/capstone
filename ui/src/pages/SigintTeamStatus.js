import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const SigintTeamStatus = () => {
  const ctx = useContext(GlobalContext);
  
  // pushes all teams with 'SIGINT' in their name to the Sigint Teams array => sets sigintTeams state variable with that array
  useEffect(() => {
    let sigintTeamsArray = [];
    for (let i = 0; i < ctx.teams.length; i++){
      let team_name = (ctx.teams[i].team_name).toUpperCase()
      if (team_name.includes('SIGINT')) {
        sigintTeamsArray.push(ctx.teams[i])
      }
      ctx.setSigintTeams(sigintTeamsArray)
    }
  }, [ctx.teams.length])

  // pushes all SIGINT teams that have any non green statuses (comms, personnel, equipment) to the nonGreenTeams array
  useEffect(() => {
    let greenSigintTeams = [];
    let yellowSigintTeams = [];
    let redSigintTeams = [];
      for(let i = 0; i <= ctx.sigintTeams.length - 1; i++) {
        let comms_status = (ctx.sigintTeams[i].comms_status).toUpperCase()
        let personnel_status = (ctx.sigintTeams[i].personnel_status).toUpperCase()
        let equipment_status = (ctx.sigintTeams[i].equipment_status).toUpperCase()
        if (comms_status === 'RED' || personnel_status === 'RED' || equipment_status === 'RED') {
          redSigintTeams.push(ctx.sigintTeams[i].team_name)
          ctx.setRedSigintTeams(redSigintTeams)
        } else if (comms_status === 'YELLOW' || personnel_status === 'YELLOW' || equipment_status === 'YELLOW') {
          yellowSigintTeams.push(ctx.sigintTeams[i].team_name)
          ctx.setYellowSigintTeams(yellowSigintTeams)
        } else {
          greenSigintTeams.push(ctx.sigintTeams[i].team_name)
          ctx.setGreenSigintTeams(greenSigintTeams)
        }
      }
  }, [ctx.sigintTeams])

  return (
    <>
      <h3 className="team-status-header">SIGINT Teams Status:</h3>

    <div className="sigint_status_container">
      <div className="red_teams">{ctx.redSigintTeams.map((team, index) => {
        return <div key={index}>{team}</div>})} 
      </div>
      <div className="yellow_teams">{ctx.yellowSigintTeams.map((team, index) => {
        return <div key={index}>{team}</div>})} 
      </div>
      <div className="green_teams">{ctx.greenSigintTeams.map((team, index) => {
        return <div key={index}>{team}</div>})} 
      </div>
    </div>
    </>
  )
};

export default SigintTeamStatus;