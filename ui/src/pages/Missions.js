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

    //DELETE person from database
    const handleDelete = async () => {
      try {
        let response = await fetch(
          `http://localhost:8081/missions/${ctx.clickedMission.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        handleCloseWarning();
        toggleRefresh();
        if (response.status !== 202) {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const toggleRefresh = () => {
      ctx.setRefresh((current) => !current);
    };

  //DELETE Confirmation Warnings
    const handleCloseWarning = () => {
      ctx.setShowWarning(false);
    };

    const handleShowWarning = () => {
      ctx.setShowWarning(true);
    };

  const renderMissionCard = (mission, index) => {
    return (
    <Card border='light' style={{ width: '18rem' }} key={index} bg='dark' text='white'className="mission-card">
      <Card.Header> {`${mission.name} - ${mission.status.toUpperCase()}`} </Card.Header>
      <Card.Body className='card-body'>
          <div className="test" key={index}>
            <div className="missions-map">Map</div>
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
          ctx.setClickedMission(mission)
          handleShowWarning()
        }}>Delete Mission</Button>
        </div>
      </Card.Body>
    </Card>
    )
  }


 
  return (
    <>
    <div className="missions-page-container">
    <div className='nav-buttons'>
    <Link className='submit-conop-link' to='/conop'>
    <Button className='add-mission' variant="success">
    Submit CONOP
    </Button>
    </Link>

    <div className="mission-search">
        <input 
            className="mission-search-bar" 
            type='text' 
            placeholder="Search Missions" 
            onChange={(event) => {handleSearch(event)}}
            value={missionSearchTerm}
        />    
    </div>

    <Link className='homepage-link' to='/'>
    <Button variant='primary' className='homepage-button'>
      Back to Home
    </Button>
    </Link>
    </div>

    <div className="mission-card-container">
        {[...filteredMissionData].map(renderMissionCard)}
    </div>
    </div>

    <Modal
        show={ctx.showWarning}
        onHide={handleCloseWarning}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>CONFIRM</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to delete this entry?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarning}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              handleDelete();
              ctx.setSearchTerm("");
              toggleRefresh()
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
</>
  )
};

export default Missions;
