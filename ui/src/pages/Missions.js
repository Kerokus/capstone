import React, { useContext, useEffect, useState } from "react";
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

const Missions = () => {
  const ctx = useContext(GlobalContext)
  const [missionSearchTerm, setMissionSearchTerm] = useState(''); 
  const [filteredMissionData, setFilteredMissionData] = useState('');
  
  useEffect(() => {
    ctx.setShow(false)
  }, [])

  useEffect(() => {
    setFilteredMissionData(ctx.missions)
  }, [ctx.missions])

  //// Search Functions////
  // ctx.sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
    setMissionSearchTerm(event.target.value);
    console.log(missionSearchTerm)
  };

  //Filters the data without having to select a "Search By" Category
  useEffect(() => {
    let searchArray = [];
    ctx.missions.forEach((mission) => {
      let missionDataString = JSON.stringify(mission);
      if (
        missionDataString.toLowerCase().includes(missionSearchTerm.toLowerCase())
      ) {
        if (
          searchArray.filter((item) => {
            return item.id === mission.id;
          }).length === 0
        ) {
          searchArray.push(mission);
        }
      }
      setFilteredMissionData(searchArray);
    });
  }, [missionSearchTerm]);

  // add mission 
  const handleAdd = () => {
    ctx.setIsAdd(true);
    ctx.setValidated(false);
    handleShow();
  };

  //Open "Mission" form
  const handleShow = () => ctx.setShow(true);

  const renderMissionCard = (mission, index) => {
    return (
    <Card border='light' style={{ width: '18rem' }} key={index} bg='dark' text='white'className="mission-card">
      <Card.Header> {`${mission.name} - ${mission.status.toUpperCase()}`} </Card.Header>
      <Card.Body className='card-body'>
          <div className="test" key={index}>
            <div className="missions-map"><Places /></div>
            <div className="mission-data"> 
              <u> Location: </u>
              <p>{`${mission.location.country} - ${mission.location.city_base}`}</p>
              <u> Decision Point: </u>
              <p>{`${mission.decision_point}`}</p>
            </div>
            <div classname='asd'>
            </div>
          </div>
        <div className='buttons'>
        <Link to={`/missions/${mission.id}`} style={{color: 'white', textDecoration: 'none'}}>
        <Button variant="secondary" onClick={() => ctx.setClickedMission(mission)}>
          Mission Info
        </Button>
        </Link>
        <Button variant="danger" onClick={() => {
          // setClickedTeam(team)
          // handleDeleteShow()
        }}>Delete Mission</Button>
        </div>
      </Card.Body>
    </Card>
    )
  }
 
  return (
    <div className="missions-page-container">
    <div className='nav-buttons'>
    <Button className='add-mission' variant="success" onClick={handleAdd}>
      Add Mission
    </Button>

    <div className="mission-search">
        <input 
            className="mission-search-bar" 
            type='text' 
            placeholder="Search Missions" 
            onChange={(event) => {handleSearch(event)}}
            value={missionSearchTerm}
        />    
    </div>

    <Link className='homepage-button-personnel' to='/'>
    <Button variant='primary' className='homepage-button'>
      Back to Home
    </Button>
    </Link>
    </div>

    <div className="mission-card-container">
        {[...filteredMissionData].map(renderMissionCard)}
    </div>
    </div>
  )
};

export default Missions;
