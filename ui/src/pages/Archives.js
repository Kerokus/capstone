import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const Archives = () => {
  const ctx = useContext(GlobalContext);
  const [archivedPersonnel, setArchivedPersonnel] = useState([]);
  const [archivedMissions, setArchivedMissions] = useState([]);
  const [archivedTeams, setArchivedTeams] = useState([]);

  const [personnelSearchTerm, setPersonnelSearchTerm] = useState("");
  const [missionSearchTerm, setMissionSearchTerm] = useState("");
  const [teamSearchTerm, setTeamSearchTerm] = useState("");

  const [filteredPersonnelData, setFilteredPersonnelData] = useState("");
  const [filteredMissionData, setFilteredMissionData] = useState("");
  const [filteredTeamData, setFilteredTeamData] = useState("");

  // fetch archived personnel
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8081/archives/personnel");
          const data = await response.json();
          setArchivedPersonnel(data);
          setFilteredPersonnelData(data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }, [ctx.refresh]);

  // fetch archived teams
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8081/archives/teams");
          const data = await response.json();
          setArchivedTeams(data);
          setFilteredTeamData(data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }, [ctx.refresh]);

  // fetch archived missions
     useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8081/archives/missions");
          const data = await response.json();
          setArchivedMissions(data);
          setFilteredMissionData(data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }, [ctx.refresh]);


  // Personnel Table Headers
   const personnelColumns = [
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#212529", color: "white" };
      },
      rowStyle: (row, rowIndex) => {
        return { color: "white" };
      },
    },
    {
      dataField: "first_name",
      text: "First Name",
      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#212529", color: "white" };
      },
    },
    {
      dataField: "id",
      text: "DODID",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#212529", color: "white" };
      },
      rowStyle: (row, rowIndex) => {
        return { color: "white" };
      },
    },
    {
      dataField: "rank",
      text: "Rank",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "5%", backgroundColor: "#212529", color: "white" };
      },
    },
    {
      dataField: "mos",
      text: "MOS",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "70px", backgroundColor: "#212529", color: "white" };
      },
    },

    {
      dataField: "email",
      text: "Email address",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "300px", backgroundColor: "#212529", color: "white" };
      },
    },
    {
      dataField: "team_name",
      text: "Team",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "100px", backgroundColor: "#212529", color: "white" };
      },
    },
    {
      dataField: "city_base",
      text: "Installation",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#212529", color: "white" };
      },
    },

    {
      dataField: "country",
      text: "Country",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#212529", color: "white" };
      },
    },
    {
      dataField: "deployment_start",
      text: "Deployment Start",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#212529", color: "white" };
      },
    },
    {
      dataField: "deployment_end",
      text: "Deployment End",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#212529", color: "white" };
      },
    }
   ];

  // Teams Table Headers
    const teamsColumns = [
      {
        dataField: "team_name",
        text: "Team",
        sort: true,
        headerStyle: (column, colIndex) => {
          return { width: "100px", backgroundColor: "#212529", color: "white" };
        },
      },
      {
        dataField: "location.city_base",
        text: "City",
        sort: true,
        headerStyle: (column, colIndex) => {
          return { width: "120px", backgroundColor: "#212529", color: "white" };
        },
      },
      {
        dataField: "location.country",
        text: "Country",
        sort: true,
        headerStyle: (column, colIndex) => {
          return { width: "80px", backgroundColor: "#212529", color: "white" };
        },
      },
      {
        dataField: "comms_status",
        text: "Comms Status",
        sort: true,
        headerStyle: (column, colIndex) => {
          return { width: "80px", backgroundColor: "#212529", color: "white" };
        },
      },
      {
        dataField: "personnel_status",
        text: "Personnel Status",
        sort: true,
        headerStyle: (column, colIndex) => {
          return { width: "80px", backgroundColor: "#212529", color: "white" };
        },
      },
      {
        dataField: "equipment_status",
        text: "Equipment Status",
        sort: true,
        headerStyle: (column, colIndex) => {
          return { width: "80px", backgroundColor: "#212529", color: "white" };
        },
      }
    ];

  // Missions Table Headers => include timeline?
    const missionsColumns = [
        {
          dataField: "name",
          text: "Name",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "100px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "team_name",
          text: "Team",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "100px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "location.city_base",
          text: "City",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "location.country",
          text: "Country",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "start_date",
          text: "Start Date",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "end_date",
          text: "End Date",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "decision_point",
          text: "Decision Point",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "description",
          text: "Description",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "purpose",
          text: "Purpose",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "transportation_methods",
          text: "Transportation Methods",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        // {
        //   dataField: "timeline.sp, timeline.cp1",
        //   text: "Timeline",
        //   sort: true,
        //   headerStyle: (column, colIndex) => {
        //     return { width: "120px", backgroundColor: "#212529", color: "white" };
        //   },
        // },
        {
          dataField: "pace.P",
          text: "Primary Comms",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "pace.A",
          text: "Alternate Comms",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "pace.C",
          text: "Contingency Comms",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "pace.E",
          text: "Emergency Comms",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "risks.mission",
          text: "Risks to Mission",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "risks.force",
          text: "Risks to Force",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "end_state",
          text: "End State",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
        {
          dataField: "authority",
          text: "Authority",
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: "120px", backgroundColor: "#212529", color: "white" };
          },
        },
    ];



  //// Search Functions////

// Personnel Search 
  const handlePersonnelSearch = (event) => {
    setPersonnelSearchTerm(event.target.value);
  };

 
    useEffect(() => {
      let personnelSearchArray = [];
      archivedPersonnel.forEach((person) => {
        let personnelDataString = JSON.stringify(person);
          if (personnelDataString.toLowerCase().includes(personnelSearchTerm.toLowerCase())) {
            if (personnelSearchArray.filter((item) => {
                return item.id === person.id;
                }).length === 0
            ) {personnelSearchArray.push(person);}
          }
          setFilteredPersonnelData(personnelSearchArray);
      });
    }, [personnelSearchTerm]);

    
// Mission Search 
  const handleMissionSearch = (event) => {
    setMissionSearchTerm(event.target.value);
  };

  useEffect(() => {
    let MissionSearchArray = [];
    archivedMissions.forEach((mission) => {
      let missionDataString = JSON.stringify(mission);
      if (missionDataString.toLowerCase().includes(missionSearchTerm.toLowerCase())) {
        if (MissionSearchArray.filter((item) => {
            return item.id === mission.id;
            }).length === 0
        ) {MissionSearchArray.push(mission);}
      }
      setFilteredMissionData(MissionSearchArray);
    });
  }, [missionSearchTerm]);


  // Team Search 
  const handleTeamSearch = (event) => {
    setTeamSearchTerm(event.target.value);
  };

  useEffect(() => {
    let teamSearchArray = [];
    archivedTeams.forEach((team) => {
      let teamDataString = JSON.stringify(team);
      if (teamDataString.toLowerCase().includes(teamSearchTerm.toLowerCase())) {
        if (teamSearchArray.filter((item) => {
            return item.id === team.id;
           }).length === 0
        ) {teamSearchArray.push(team);}
      }
      setFilteredTeamData(teamSearchArray);
    });
  }, [teamSearchTerm]);

  
  return (
    <div className="archives-page-container">


      <div className="header-and-csv">
      <div className="personnel-header-text"> Archived  </div>
        <div className="displayed-entity">
          <Form.Group  id='displayed-entity'>
            <Form.Select
             
              md="3"
              id="displayed-entity-1"
              onChange={(e) => {
                ctx.setDisplayedEntity(e.target.value)
                setMissionSearchTerm("")
                setPersonnelSearchTerm("")
                setTeamSearchTerm("")
              }}
              value={ctx.displayedEntity}
               aria-label="Default select example"
               
            >
              <option>Missions</option>
              <option>Teams</option>
              <option>Personnel</option>
            </Form.Select>
          </Form.Group>

        </div>



      </div>

      
    {
      ctx.displayedEntity === 'Missions' ?
      //missions
      <div className="archived-missions-container">
        <div className="mainsearch">
          <input
            className="text-search-bar"
            type="text"
            placeholder="Search Missions"
            onChange={(event) => {
              handleMissionSearch(event);
              }}
            value={missionSearchTerm}
          />
        </div>

        <div className="table-div">
          <BootstrapTable
          keyField="id"
          data={filteredMissionData}
          columns={missionsColumns}
          rowStyle={{ backgroundColor: "#d3d3d3" }}
          striped
          />
        </div> 
      </div>
      :
      ctx.displayedEntity === 'Personnel' ?
      //personnel
      <>
        <div className="mainsearch">
          <input
            className="text-search-bar"
            type="text"
            placeholder="Search Personnel"
            onChange={(event) => {
              handlePersonnelSearch(event);
              }}
            value={personnelSearchTerm}
          />
        </div>
      
        <div className="table-div">
          <BootstrapTable
          keyField="id"
          data={filteredPersonnelData}
          columns={personnelColumns}
          rowStyle={{ backgroundColor: "#d3d3d3" }}
          striped
          />
        </div> 
      </>
      :
      //teams
      <>
        <div className="mainsearch">
          <input
            className="text-search-bar"
            type="text"
            placeholder="Search Teams"
            onChange={(event) => {
              handleTeamSearch(event);
              }}
            value={teamSearchTerm}
          />
        </div>

        <div className="table-div">
          <BootstrapTable
          keyField="id"
          data={filteredTeamData}
          columns={teamsColumns}
          rowStyle={{ backgroundColor: "#d3d3d3" }}
          striped
          />
        </div> 
      </>
    }

    
    </div>
  );
};




export default Archives;




 
