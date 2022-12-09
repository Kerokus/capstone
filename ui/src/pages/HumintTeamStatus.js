import React, { useState, useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const HumintTeamStatus = () => {
  const ctx = useContext(GlobalContext);
  
  // pushes all teams with 'HUMINT' in their name to the Humint Teams array => sets humintTeams state variable with that array
  useEffect(() => {
    let humintTeamsArray = [];
    for (let i = 0; i < ctx.teams.length; i++){
      let team_name = (ctx.teams[i].team_name).toUpperCase()
      if (team_name.includes('HUMINT')) {
        humintTeamsArray.push(ctx.teams[i])
      }
      ctx.setHumintTeams(humintTeamsArray)
    }
  }, [ctx.teams.length])

  // pushes all HUMINT teams that have any non green statuses (comms, personnel, equipment) to the nonGreenTeams array
  useEffect(() => {
    let greenHumintTeams = [];
    let yellowHumintTeams = [];
    let redHumintTeams = [];
      for(let i = 0; i <= ctx.humintTeams.length - 1; i++) {
        let comms_status = (ctx.humintTeams[i].comms_status).toUpperCase()
        let personnel_status = (ctx.humintTeams[i].personnel_status).toUpperCase()
        let equipment_status = (ctx.humintTeams[i].equipment_status).toUpperCase()
        if (comms_status === 'RED' || personnel_status === 'RED' || equipment_status === 'RED') {
          redHumintTeams.push(ctx.humintTeams[i].team_name)
          ctx.setRedHumintTeams(redHumintTeams)
        } else if (comms_status === 'YELLOW' || personnel_status === 'YELLOW' || equipment_status === 'YELLOW') {
          yellowHumintTeams.push(ctx.humintTeams[i].team_name)
          ctx.setYellowHumintTeams(yellowHumintTeams)
        } else {
          greenHumintTeams.push(ctx.humintTeams[i].team_name)
          ctx.setGreenHumintTeams(greenHumintTeams)
        }
      }
  }, [ctx.humintTeams])

  return (
    <>
      <h3 className="team-status-header">HUMINT Teams Status:</h3>

    <div className="humint_status_container">
      <div className="red_teams">{ctx.redHumintTeams.map((team, index) => {
        return <div key={index}>{team}</div>})} 
      </div>
      <div className="yellow_teams">{ctx.yellowHumintTeams.map((team, index) => {
        return <div key={index}>{team}</div>})} 
      </div>
      <div className="green_teams">{ctx.greenHumintTeams.map((team, index) => {
        return <div key={index}>{team}</div>})} 
      </div>
    </div>
    </>
  )
};

export default HumintTeamStatus;