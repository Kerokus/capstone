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

  // fetch archived personnel
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8081/archives/personnel");
          const data = await response.json();
          setArchivedPersonnel(data);
          // ctx.setFilteredData(dataSlice);
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
          // ctx.setFilteredData(dataSlice);
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
          // ctx.setFilteredData(dataSlice);
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
      text: "City",
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

  {/* <Csv /> */}
  return (
    <>

      <div className="header-and-csv">
      <div className="personnel-header-text"> Archived  </div>
        <div className="displayed-entity">
          <Form.Group as={Col} md="12" id='displayed-entity' >
            <Form.Select
             
              md="3"
              id="displayed-entity"
              onChange={(e) => ctx.setDisplayedEntity(e.target.value)}
              value={ctx.displayedEntity}
               aria-label="Default select example"
               
            >
              <option>Missions</option>
              <option>Teams</option>
              <option>Personnel</option>
            </Form.Select>
          </Form.Group>
        </div>

        {/* {
          ctx.displayedEntity === 'Missions' ? 
          <div className="personnel-header-text"> Archived Missions </div> :
          ctx.displayedEntity === 'Personnel' ? 
          <div className="personnel-header-text"> Archived Personnel </div> :
          <div className="personnel-header-text"> Archived Teams </div> 
        } */}

      </div>

      
    {
      ctx.displayedEntity === 'Missions' ?
      //missions
        <div className="table-div">
          <BootstrapTable
          keyField="id"
          data={archivedMissions}
          columns={missionsColumns}
          rowStyle={{ backgroundColor: "#d3d3d3" }}
          striped
          />
        </div> 
      :
      ctx.displayedEntity === 'Personnel' ?
      //personnel
        <div className="table-div">
          <BootstrapTable
          keyField="id"
          data={archivedPersonnel}
          columns={personnelColumns}
          rowStyle={{ backgroundColor: "#d3d3d3" }}
          striped
          />
        </div> 
      :
      //teams
        <div className="table-div">
          <BootstrapTable
          keyField="id"
          data={archivedTeams}
          columns={teamsColumns}
          rowStyle={{ backgroundColor: "#d3d3d3" }}
          striped
          />
        </div> 
    }

    
    </>
  );
};




export default Archives;




 
