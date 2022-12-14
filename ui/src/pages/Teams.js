import React, { useState, useContext, useEffect } from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import Card from 'react-bootstrap/Card';


import '../styling/missions.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Places from "../components/Map"

const Teams = () => {
  const ctx = useContext(GlobalContext) 
  const [teamSearchTerm, setTeamSearchTerm] = useState(''); 
  const [filteredTeamData, setFilteredTeamData] = useState('');

  useEffect(() => {
    ctx.setShow(false)
  }, [])

  useEffect(() => {
    setFilteredTeamData(ctx.missions)
  }, [ctx.teams])

    //// Search Functions////
  // ctx.sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
    setTeamSearchTerm(event.target.value);
  };


  //Filters the data without having to select a "Search By" Category
  useEffect(() => {
    let searchArray = [];
    ctx.teams.forEach((team) => {
      let teamDataString = JSON.stringify(team);
      if (
        teamDataString.toLowerCase().includes(teamSearchTerm.toLowerCase())
      ) {
        if (
          searchArray.filter((item) => {
            return item.id === team.id;
          }).length === 0
        ) {
          searchArray.push(team);
        }
      }
      setFilteredTeamData(searchArray);
    });
  }, [teamSearchTerm]);

  const renderTeamCard = (team, index) => {
    return (
    <Card border='light' style={{ width: '18rem' }} key={index} bg='dark' text='white'className="mission-card">
      <Card.Header> {team.team_name} </Card.Header>
      <Card.Body className='card-body'>



          <div className="test" key={index}>
<<<<<<< HEAD
=======
            <div className="team-map"> <Places/></div>
>>>>>>> main
            <div className="team-location-data"> 
              <u> Current Location: </u>
              <p>{`${team.location.country} - ${team.location.city_base}`}</p>
            </div>
            <div className='asd'>
            </div>
          </div>


        <div className='buttons'>
        <Link to={`/teams/${team.id}`} style={{color: 'white', textDecoration: 'none'}}>
        <Button variant="secondary" onClick={() => ctx.setClickedTeam(team)}>
          Team Info
        </Button>
        </Link>
        <Button variant="danger" onClick={() => {
          // setClickedTeam(team)
          // handleDeleteShow()
        }}>Delete Team</Button>
        </div>
      </Card.Body>
    </Card>
    )
  }
 
  return (
    <>


    
    <div className='nav-buttons'>
    <Button className='add-mission' variant="success" onClick={console.log('clicked')}>
      Add Team
    </Button>


    <div className="mission-search">
        <input 
            className="mission-search-bar" 
            type='text' 
            placeholder="Search Teams" 
            onChange={(event) => {handleSearch(event)}}
            value={teamSearchTerm}
        />    
    </div>

    <Link className='homepage-button-personnel' to='/'>
    <Button variant='primary' className='homepage-button'>
      Back to Home
    </Button>
    </Link>
    </div>

    <div className="mission-card-container">
        {[...filteredTeamData].map(renderTeamCard)}
    </div>
    </>
  )
};

export default Teams;
