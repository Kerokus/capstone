import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";

const HumintTeamStatus = () => {
  const ctx = useContext(GlobalContext);

  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };
  
  useEffect(() => {
    toggleRefresh()
  }, [ctx.redHumintTeams, ctx.yellowHumintTeams, ctx.greenHumintTeams])

  /* iterates over the teams state variable, then pushes all teams with 'HUMINT' in their name to the humintTeamsArray,
  then sets the humintTeams state variable with that array. [fires whenever the teams state variable changes]. */
  useEffect(() => {
    let humintTeamsArray = [];
    for (let i = 0; i < ctx.teams.length; i++) {
      let team_name = ctx.teams[i].team_name.toUpperCase();
      if (team_name.includes("HUMINT")) {
        humintTeamsArray.push(ctx.teams[i]);
      }
      ctx.setHumintTeams(humintTeamsArray);
    }
  }, [ctx.teams.length]);

  /* sorts teams into 1 of 3 arrays (greenHumintTeams, yellowHumintTeams, redHumintTeams) depending on their 
  comms, personnel, and equipment status. If a team has ANY red status they are pushed into the red array,
  if a team has no red and some yellow they are pushed into the yellow array, and if a team has no red AND no yellow status
  they are pushed into the green array. the corresponding state variables are then set using those arrays. 
  [fires everytime the humintTeams state variable changes]. */
  useEffect(() => {
    let greenHumintTeams = [];
    let yellowHumintTeams = [];
    let redHumintTeams = [];
    for (let i = 0; i <= ctx.humintTeams.length - 1; i++) {
      let comms_status = ctx.humintTeams[i].comms_status.toUpperCase();
      let personnel_status = ctx.humintTeams[i].personnel_status.toUpperCase();
      let equipment_status = ctx.humintTeams[i].equipment_status.toUpperCase();
      if (
        comms_status === "RED" ||
        personnel_status === "RED" ||
        equipment_status === "RED"
      ) {
        redHumintTeams.push(ctx.humintTeams[i]);
        ctx.setRedHumintTeams(redHumintTeams);
      } else if (
        comms_status === "YELLOW" ||
        personnel_status === "YELLOW" ||
        equipment_status === "YELLOW"
      ) {
        yellowHumintTeams.push(ctx.humintTeams[i]);
        ctx.setYellowHumintTeams(yellowHumintTeams);
      } else {
        greenHumintTeams.push(ctx.humintTeams[i]);
        ctx.setGreenHumintTeams(greenHumintTeams);
      }
    }
  }, [ctx.humintTeams]);

  /* the return sets up 3 divs (red_teams, yellow_teams, green_teams), each div maps over the corresponding 
  state variables (redHumintTeams, yellowHumintTeams, greenHumintTeams) and returns the team names. */
  return (
    <>
      <div className="humint-team-status">
        <h3 className="team-status-header">HUMINT Teams Status:</h3>
        <div className="red_teams">
          {ctx.redHumintTeams.map((team, index) => {
            return (
              <div className="humint-teams-status-red" key={index}>
                <Link
                  onClick={() => {
                    ctx.setClickedTeam(team);
                  }}
                  className="dashboard-team-link"
                  to={`/teams/${team.id}`}
                >
                  <span>{team.team_name}</span>
                </Link>
                {/* <span>🟥</span> */}
              </div>
            );
          })}
        </div>
        <div className="yellow_teams">
          {ctx.yellowHumintTeams.map((team, index) => {
            return (
              <div className="humint-teams-status-yellow" key={index}>
                <Link
                  onClick={() => {
                    ctx.setClickedTeam(team);
                  }}
                  className="dashboard-team-link"
                  to={`/teams/${team.id}`}
                >
                  <span>{team.team_name}</span>
                </Link>
                {/* <span>🟨</span> */}
              </div>
            );
          })}
        </div>
        <div className="green_teams">
          {ctx.greenHumintTeams.map((team, index) => {
            return (
              <div className="humint-teams-status-green" key={index}>
                <Link
                  onClick={() => {
                    ctx.setClickedTeam(team);
                  }}
                  className="dashboard-team-link"
                  to={`/teams/${team.id}`}
                >
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

export default HumintTeamStatus;
