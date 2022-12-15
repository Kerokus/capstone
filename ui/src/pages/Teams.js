import React, { useContext, useEffect, useState} from "react";
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
import BootstrapTable from "react-bootstrap-table-next";

const Teams = () => {
  const ctx = useContext(GlobalContext) 
  const [teamSearchTerm, setTeamSearchTerm] = useState(''); 
  const [filteredTeamData, setFilteredTeamData] = useState('');

  useEffect(() => {
    ctx.setShow(false)
    ctx.setShowWarning(false)
  }, [])

  useEffect(() => {
    setFilteredTeamData(ctx.teams)
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

      //DELETE mission from database
      const handleDelete = async () => {
        try {
          let response = await fetch(
            `http://localhost:8081/teams/${ctx.clickedTeam.id}`,
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



// add team stuff


  //Close "Add personnel" form
  const handleClose = () => {
    ctx.setValidated(false);
    ctx.setShow(false);
    ctx.setFormData({});
  };

    //ADD new personnel / EDIT existing personnel
    const handleSubmit = async (event) => {
      // try {
      //   const form = event.currentTarget;
      //   if (form.checkValidity() === false) {
      //     event.preventDefault();
      //     event.stopPropagation();
      //     ctx.setValidated(true);
      //   } else {
      //     ctx.setValidated(true);
      //     event.preventDefault();
      //     let response = await fetch(
      //       ctx.isAdd
      //         ? "http://localhost:8081/personnel"
      //         : `http://localhost:8081/personnel/${ctx.formData.id}`,
      //       {
      //         method: ctx.isAdd ? "POST" : "PUT",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify(ctx.formData),
      //       }
      //     );
      //     ctx.setFormData({});
      //     handleClose();
      //     toggleRefresh();
      //     if (response.status !== 201) {
      //       throw new Error();
      //     }
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    };

  //ctx.set state for the "Add personnel" form
  const handleFormData = (event, nestedObject) => {
    let newData = { ...ctx.formData };
    if (nestedObject) {
      newData[nestedObject] = {
        ...newData[nestedObject],
        [event.target.id]: event.target.value,
      };
    } else {
      newData[event.target.id] = event.target.value;
    }
    ctx.setFormData(newData);
  };


  const handleAdd = () => {
    ctx.setIsAdd(true);
    ctx.setValidated(false);
    handleShow();
  };

  //Open "Personnel" form
  const handleShow = () => ctx.setShow(true);










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
            <div classname='asd'>
            </div>
          </div>


        <div className='buttons'>
        <Link to={`/teams/${team.id}`} style={{color: 'white', textDecoration: 'none'}}>
        <Button variant="secondary" onClick={() => ctx.setClickedTeam(team)}>
          Team Info
        </Button>
        </Link>
        <Button variant="danger" onClick={() => {
          ctx.setClickedTeam(team)
          handleShowWarning()
        }}>Delete Team</Button>
        </div>
      </Card.Body>
    </Card>
    )
  }
 
  return (
    <>


    
    <div className='nav-buttons'>
    <Button className='add-mission' variant="success" onClick={handleAdd}>
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
              toggleRefresh();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={ctx.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add/Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={ctx.validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="3">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                  id="name"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.id || ""}
                  required
                  type="number"
                  minLength={"10"}
                  maxLength={"10"}
                  placeholder="Team Name"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  id="last_name"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.last_name || ""}
                  required
                  type="text"
                  placeholder="Location"
                />
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Comms Status</Form.Label>
                <Form.Control
                  id="first_name"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.first_name || ""}
                  required
                  type="text"
                  placeholder="Comms Status"
                />
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Personnel Status</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id="rank"
                    onChange={(e) => handleFormData(e)}
                    value={ctx.formData.rank || ""}
                    className="formRank"
                    type="text"
                    minLength={"3"}
                    maxLength={"3"}
                    placeholder="Personnel Status"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a three-letter rank.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3">
                <Form.Label>Equipment Status</Form.Label>
                <Form.Control
                  id="mos"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.mos || ""}
                  className="formMOS"
                  type="text"
                  minLength={"3"}
                  maxLength={"4"}
                  placeholder="MOS"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter an MOS.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default Teams;
