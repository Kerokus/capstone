import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import "../styling/personnel.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import BootstrapTable from "react-bootstrap-table-next";
import { Pen, Trash3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Csv from "../components/Csv";

const Personnel = () => {
  //Justin's Original Functionality States:
  const ctx = useContext(GlobalContext);

  //
  useEffect(() => {
    ctx.setShow(false);
    ctx.setSearchTerm("");
  }, []);

  //TABLE HEADERS
  const columns = [
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
      dataField: "status",
      text: "Status",
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
    },
    {
      dataField: "id",
      text: "",
      formatter: (cell, row, rowIndex) => {
        return (
          <div className="table-buttons">
            <Button variant="secondary" onClick={() => handleEditShow(cell)}>
              <Pen />
            </Button>
            <Button variant="danger" onClick={() => handleShowWarning(cell)}>
              <Trash3 />
            </Button>
          </div>
        );
      },
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: "#212529", color: "white" };
      },
    },
  ];

  ////DATA HANDLERS////

  //Call this to refresh the table
  const toggleRefresh = () => {
    ctx.setRefresh((current) => !current);
  };

  //Open "Personnel" form
  const handleShow = () => ctx.setShow(true);

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

  //Close "Add personnel" form
  const handleClose = () => {
    ctx.setValidated(false);
    ctx.setShow(false);
    ctx.setFormData({});
  };

  //ctx.set Add State
  const handleAdd = () => {
    ctx.setIsAdd(true);
    ctx.setValidated(false);
    handleShow();
  };

  //EDIT existing person within database
  const handleEditShow = async (fieldId) => {
    ctx.setIsAdd(false);
    try {
      let response = await fetch(`http://localhost:8081/personnel/${fieldId}`)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          let dataSlice = data.map((item) => {
            if (item.dep_start) {
              item.dep_start = item.dep_start.slice(0, 10);
            }
            if (item.dep_end) {
              item.dep_end = item.dep_end.slice(0, 10);
            }
            return item;
          });
          ctx.setFormData(dataSlice[0]);
        });
      handleShow();
    } catch (error) {}
  };

  //ADD new personnel / EDIT existing personnel
  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        ctx.setValidated(true);
      } else {
        ctx.setValidated(true);
        event.preventDefault();
        let response = await fetch(
          ctx.isAdd
            ? "http://localhost:8081/personnel"
            : `http://localhost:8081/personnel/${ctx.formData.id}`,
          {
            method: ctx.isAdd ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ctx.formData),
          }
        );
        ctx.setFormData({});
        handleClose();
        toggleRefresh();
        if (response.status !== 201) {
          throw new Error();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE person from database
  const handleDelete = async () => {
    try {
      let response = await fetch(
        `http://localhost:8081/personnel/${ctx.deleteValue}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toggleRefresh();
      handleCloseWarning();
      if (response.status !== 202) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE Confirmation Warnings
  const handleCloseWarning = () => {
    ctx.setShowWarning(false);
    ctx.setDeleteValue("");
  };

  const handleShowWarning = (rowId) => {
    ctx.setShowWarning(true);
    ctx.setDeleteValue(rowId);
  };

  //// Search Functions////

  // ctx.sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
    ctx.setSearchTerm(event.target.value);
  };

  //Filters the data without having to select a "Search By" Category
  useEffect(() => {
    let searchArray = [];
    ctx.personnelData.forEach((person) => {
      let personnelDataString = JSON.stringify(person);
      if (
        personnelDataString.toLowerCase().includes(ctx.searchTerm.toLowerCase())
      ) {
        if (
          searchArray.filter((item) => {
            return item.id === person.id;
          }).length === 0
        ) {
          searchArray.push(person);
        }
      }
      ctx.setFilteredData(searchArray);
    });
  }, [ctx.searchTerm]);
  // background-color: #212529;

  return (
    <div className="personnel-page-container">
      <div className="nav-buttons">
        <Button className="add-mission" variant="success" onClick={handleAdd}>
          Add Personnel
        </Button>

        <div className="mainsearch">
          <input
            className="text-search-bar"
            type="text"
            placeholder="Search Personnel"
            onChange={(event) => {
              handleSearch(event);
            }}
            value={ctx.searchTerm}
          />
        </div>

        <Link className="homepage-button-personnel" to="/">
          <Button variant="primary" className="homepage-button">
            Dashboard
          </Button>
        </Link>
      </div>

      <Modal
        show={ctx.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add/Edit Personnel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={ctx.validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="4">
                <Form.Label>DODID</Form.Label>
                <Form.Control
                  id="id"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.id || ""}
                  required
                  type="number"
                  minLength={"10"}
                  maxLength={"10"}
                  placeholder="DODID"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  id="last_name"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.last_name || ""}
                  required
                  type="text"
                  placeholder="Last Name"
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  id="first_name"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.first_name || ""}
                  required
                  type="text"
                  placeholder="First Name"
                />
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Rank</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id="rank"
                    onChange={(e) => handleFormData(e)}
                    value={ctx.formData.rank || ""}
                    className="formRank"
                    type="text"
                    minLength={"3"}
                    maxLength={"3"}
                    placeholder="RNK"
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
                <Form.Label>MOS</Form.Label>
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

              <Form.Group as={Col} md="3">
                <Form.Label>Team #</Form.Label>
                <Form.Select
                  id="team_id"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.team_id || ""}
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  {ctx.teamData.map((team) => {
                    return (
                      <option value={team.id} key={team.team_id}>
                        {team.team_name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a team #
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  id="email"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.email || ""}
                  type="email"
                  placeholder="email@address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  id="status"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.status || ""}
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  <option>PDY</option>
                  <option>TDY</option>
                  <option>Leave</option>
                  <option>Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a team #
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>City/Base</Form.Label>
                <Form.Control
                  id="city_base"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.city_base || ""}
                  className="city-base"
                  type="text"
                  placeholder="City or Base"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter City or Base
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  id="country"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.country || ""}
                  className="country"
                  type="text"
                  placeholder="Country"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a country.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Deployment Start Date</Form.Label>
                <Form.Control
                  id="deployment_start"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.deployment_start || ""}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Deployment Start Date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Deployment End Date</Form.Label>
                <Form.Control
                  id="deployment_end"
                  onChange={(e) => handleFormData(e)}
                  value={ctx.formData.deployment_end || ""}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Deployment End Date.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" className= "green-button" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* <div className="personnel-header-text"> <Csv/> Deployed Personnel <Csv/> </div> */}
      <div className="header-and-csv">
        <div className="personnel-header-text"> Total Personnel: <span>{ctx.personnelData.length}</span></div>
        <Csv />
      </div>

      <div className="table-div">
        <BootstrapTable
          keyField="id"
          data={ctx.filteredData}
          columns={columns}
          rowStyle={{ backgroundColor: "#d3d3d3" }}
          striped
        />
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
            className= "red-button"
            onClick={() => {
              handleDelete();
              ctx.setSearchTerm("");
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Personnel;
