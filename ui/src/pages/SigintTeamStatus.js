import React, { useEffect, useContext } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";

const SigintTeamStatus = () => {
  const ctx = useContext(GlobalContext);
  
  /* iterates over the teams state variable, then pushes all teams with 'SIGINT' in their name to the sigintTeamsArray,
  then sets the sigintTeams state variable with that array. [fires whenever the teams state variable changes]. */
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

  /* sorts teams into 1 of 3 arrays (greenSigintTeams, yellowSigintTeams, redSigintTeams) depending on their 
  comms, personnel, and equipment status. If a team has ANY red status they are pushed into the red array,
  if a team has no red and some yellow they are pushed into the yellow array, and if a team has no red AND no yellow status
  they are pushed into the green array. the corresponding state variables are then set using those arrays. 
  [fires everytime the sigintTeams state variable changes]. */
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

  /* the return sets up 3 divs (red_teams, yellow_teams, green_teams), each div maps over the corresponding 
  state variables (redSigintTeams, yellowSigintTeams, greenSigintTeams) and returns the team names. */
  return (
    <>
      <h3 className="team-status-header">SIGINT Teams Status:</h3>

    <div className="sigint_status_container">
      <div className="red_teams">{ctx.redSigintTeams.map((team, index) => {
        return <div key={index}>{team} 🟥</div>})} 
      </div>
      <div className="yellow_teams">{ctx.yellowSigintTeams.map((team, index) => {
        return <div key={index}>{team} 🟨</div>})} 
      </div>
      <div className="green_teams">{ctx.greenSigintTeams.map((team, index) => {
        return <div key={index}>{team} 🟩</div>})} 
      </div>
    </div>
    </>
  )
};

export default SigintTeamStatus;