import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
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

  const renderTeamCard = (team, index) => {
    var coordinates = {}
//console.log("flag:",team)
    if (team.location.country === 'Kuwait'){
      coordinates = {lat: 28.871513, lng: 48.163907}
    } else if (team.location.country === 'Jordan'){
      coordinates = {lat:31.967195, lng:35.910519}
    } else if (team.location.country === 'USA'){
      coordinates = {lat:33.4302, lng:-82.1261}
    }else{
      coordinates = {lat:48.8566, lng:2.3522}
    }
// console.log("other:", coordinates)
    return (
    <Card border='light' style={{ width: '18rem' }} key={index} bg='dark' text='white' className="mission-card">
      <Card.Header> {team.team_name} </Card.Header>
      <Card.Body className='card-body'>



          <div className="test" key={index}>
            <div className="team-map"> <Places coordinates={coordinates}/></div>
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
    <Link className='homepage-button-personnel' to='/'>
    <Button variant='primary' className='homepage-button'>
      Back to Home
    </Button>
    </Link>
    </div>

    <div className="mission-card-container">
        {[...ctx.teams].map(renderTeamCard)}
    </div>
    </>
  )
};

export default Teams;
