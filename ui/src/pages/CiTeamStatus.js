import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";

const CiTeamStatus = () => {
  const ctx = useContext(GlobalContext);

  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };
  console.log("string")
  useEffect(() => {
    toggleRefresh()
  }, []);


  /* iterates over the teams state variable, then pushes all teams with 'CI' in their name to the ciTeamsArray,
  then sets the ciTeams state variable with that array. [fires whenever the teams state variable changes]. */
  useEffect(() => {
    let ciTeamsArray = [];
    for (let i = 0; i < ctx.teams.length; i++) {
      let team_name = ctx.teams[i].team_name.toUpperCase();
      if (team_name.includes("CI")) {
        ciTeamsArray.push(ctx.teams[i]);
      }
      ctx.setCiTeams(ciTeamsArray);
    }
  }, [ctx.teams.length, ctx.refresh]);

  /* sorts teams into 1 of 3 arrays (greenCiTeams, yellowCiTeams, redCiTeams) depending on their 
  comms, personnel, and equipment status. If a team has ANY red status they are pushed into the red array,
  if a team has no red and some yellow they are pushed into the yellow array, and if a team has no red AND no yellow status
  they are pushed into the green array. the corresponding state variables are then set using those arrays. 
  [fires everytime the ciTeams state variable changes]. */
  useEffect(() => {
    let greenCiTeams = [];
    let yellowCiTeams = [];
    let redCiTeams = [];
    for (let i = 0; i <= ctx.ciTeams.length - 1; i++) {
      let comms_status = ctx.ciTeams[i].comms_status.toUpperCase();
      let personnel_status = ctx.ciTeams[i].personnel_status.toUpperCase();
      let equipment_status = ctx.ciTeams[i].equipment_status.toUpperCase();
      if (
        comms_status === "RED" ||
        personnel_status === "RED" ||
        equipment_status === "RED"
      ) {
        redCiTeams.push(ctx.ciTeams[i]);
        ctx.setRedCiTeams(redCiTeams);
      } else if (
        comms_status === "YELLOW" ||
        personnel_status === "YELLOW" ||
        equipment_status === "YELLOW"
      ) {
        yellowCiTeams.push(ctx.ciTeams[i]);
        ctx.setYellowCiTeams(yellowCiTeams);
      } else {
        greenCiTeams.push(ctx.ciTeams[i]);
        ctx.setGreenCiTeams(greenCiTeams);
      }
    }
  }, [ctx.ciTeams, ctx.refresh]);

  /* the return sets up 3 divs (red_teams, yellow_teams, green_teams), each div maps over the corresponding 
  state variables (redCiTeams, yellowCiTeams, greenCiTeams) and returns the team names. */
  return (
    <>
      <div className="ci-team-status">
        <h3 className="team-status-header">CI Teams Status:</h3>
        <div className="red_teams">
          {ctx.redCiTeams.map((team, index) => {
            return (

            <div className="ci-teams-status-red" key={index}>
              <Link
              onClick={() => {ctx.setClickedTeam(team)}}
              className="dashboard-team-link"
              to={`/teams/${team.id}`}>
                <span>{team.team_name}</span> 
              </Link>
              {/* <span>🟥</span> */}
            </div>
            );
          })}
        </div>
        <div className="yellow_teams">
          {ctx.yellowCiTeams.map((team, index) => {
            return (
              <div className="ci-teams-status-yellow" key={index}>
                <Link
                onClick={() => {ctx.setClickedTeam(team)}}
                className="dashboard-team-link"
                to={`/teams/${team.id}`}>
                  <span>{team.team_name}</span> 
                </Link>
                {/* <span>🟨</span> */}
              </div>
            );
          })}
        </div>
        <div className="green_teams">
          {ctx.greenCiTeams.map((team, index) => {
            return (
              <div className="ci-teams-status-green" key={index}>
                <Link
                onClick={() => {ctx.setClickedTeam(team)}}
                className="dashboard-team-link"
                to={`/teams/${team.id}`}>
                  <span>{team.team_name}</span> 
                </Link>
                {/* <span>🟩</span> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};




export default CiTeamStatus;

{
  /* <>
<h3 className="team-status-header">CI Teams Status:</h3>

  <div className="red-teams">
    {ctx.redCiTeams.map((team, index) => {
      return <div className="red" key={index}> <div className="team-name" >{team}</div> <div className="team-status" >🟥</div> </div>
    })}
  </div>

  <div className="yellow-teams">
    {ctx.yellowCiTeams.map((team, index) => {
      return <div className="yellow" key={index}><div className="team-name" >{team}</div> <div className="team-status" >🟨</div> </div>
    })}
  </div>

  <div className="green-teams">
    {ctx.greenCiTeams.map((team, index) => {
      return <div className="green" key={index}><div className="team-name" >{team}</div> <div className="team-status" >🟩</div> </div>
    })}
  </div>
</> */
}
