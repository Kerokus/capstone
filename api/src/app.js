const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

//REMOVE THESE LINES IF SHIT BREAKS
const env = process.env.NODE_ENV || "development";
const config = require("../knexfile")[env];
const knex = require("knex")(config);

/////////////////////////////////////////////////////////////  GET  ////////////////////////////////////////////////////////////

// mission GET endpoint that includes the team name
app.get("/missions", async (req, res) => {
  try {
    let data = await knex("missions")
      .join("teams", "missions.team_id", "=", "teams.id")
      .select(
        "missions.id",
        "missions.start_date",
        "missions.end_date",
        "missions.location",
        "missions.name",
        "missions.description",
        "missions.status",
        "missions.purpose",
        "missions.authority",
        "missions.end_state",
        "missions.transportation_methods",
        "missions.timeline",
        "missions.pace",
        "missions.risks",
        "missions.decision_point",
        "missions.is_archived",
        "missions.team_id",
        "team_name"
      )

      .where("missions.is_archived", false)
      .orderBy("missions.start_date");

    (await (!data || data.length))
      ? res.status(200).send(data)
      : res.status(404).send("Missions endpoint experiencing difficulties.");
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

// personnel GET endpoint that includes the team name
app.get("/personnel", async (req, res) => {
  try {
    let data = await knex("personnel")
      .join("teams", "personnel.team_id", "=", "teams.id")
      .select(
        "personnel.id",
        "personnel.first_name",
        "personnel.last_name",
        "personnel.rank",
        "personnel.mos",
        "personnel.email",
        "personnel.status",
        "personnel.city_base",
        "personnel.country",
        "personnel.deployment_start",
        "personnel.deployment_end",
        "personnel.is_archived",
        "personnel.team_id",
        "team_name"
      )
      .where("personnel.is_archived", false)
      .orderBy("personnel.last_name");
    (await (!data || data.length))
      ? res.status(200).send(data)
      : res.status(404).send("Personnel endpoint experiencing difficulties.");
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

// teams GET endpoint
app.get("/teams", async (req, res) => {
  try {
    let data = await knex("teams")
      .select("*")
      .where("teams.is_archived", false)
      .orderBy("teams.team_name");
    (await (!data || data.length))
      ? res.status(200).send(data)
      : res.status(404).send(`Teams endpoint experiencing difficulties.`);
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

// mission by id GET endpoint that includes the team name
app.get("/missions/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let data = await knex("missions")
      .join("teams", "missions.team_id", "=", "teams.id")
      .select(
        "missions.id",
        "missions.start_date",
        "missions.end_date",
        "missions.location",
        "missions.name",
        "missions.description",
        "missions.status",
        "missions.purpose",
        "missions.authority",
        "missions.end_state",
        "missions.transportation_methods",
        "missions.timeline",
        "missions.pace",
        "missions.risks",
        "missions.decision_point",
        "missions.is_archived",
        "missions.team_id",
        "team_name"
      )
      .where("missions.id", id)
      .where("missions.is_archived", false);
    (await (!data || data.length))
      ? res.status(200).send(data)
      : res.status(404).send(`Mission with Id "${id}" not found.`);
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

// personnel by id GET endpoint that includes the team name
app.get("/personnel/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let data = await knex("personnel")
      .join("teams", "personnel.team_id", "=", "teams.id")
      .select(
        "personnel.id",
        "personnel.first_name",
        "personnel.last_name",
        "personnel.rank",
        "personnel.mos",
        "personnel.email",
        "personnel.status",
        "personnel.city_base",
        "personnel.country",
        "personnel.deployment_start",
        "personnel.deployment_end",
        "personnel.is_archived",
        "personnel.team_id",
        "team_name"
      )
      .where("personnel.id", id)
      .where("personnel.is_archived", false);
    (await (!data || data.length))
      ? res.status(200).send(data)
      : res.status(404).send(`Personnel with Id "${id}" not found.`);
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

// team by id GET endpoint
app.get("/teams/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let data = await knex("teams")
      .select("*")
      .where("teams.id", id)
      .where("is_archived", false);
    (await (!data || data.length))
      ? res.status(200).send(data)
      : res.status(404).send(`Team with Id "${id}" not found.`);
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

//archived Missions Endpoint
app.get("/archives/missions", async (req, res) => {
  try {
    let data = await knex("missions")
      .join("teams", "missions.team_id", "=", "teams.id")
      .select(
        "missions.id",
        "missions.start_date",
        "missions.end_date",
        "missions.location",
        "missions.name",
        "missions.description",
        "missions.status",
        "missions.purpose",
        "missions.authority",
        "missions.end_state",
        "missions.transportation_methods",
        "missions.timeline",
        "missions.pace",
        "missions.risks",
        "missions.decision_point",
        "missions.is_archived",
        "missions.team_id",
        "team_name"
      )
      .where("missions.is_archived", true)
      .orderBy("missions.start_date");
    (await (!data || data.length))
      ? res.status(200).send(data)
      : res.status(404).send(`Missions endpoint experiencing difficulties.`);
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

//archived Personnel Endpoint
app.get("/archives/personnel", async (req, res) => {
  try {
    let data = await knex("personnel")
      .join("teams", "personnel.team_id", "=", "teams.id")
      .select(
        "personnel.id",
        "personnel.first_name",
        "personnel.last_name",
        "personnel.rank",
        "personnel.mos",
        "personnel.email",
        "personnel.status",
        "personnel.city_base",
        "personnel.country",
        "personnel.deployment_start",
        "personnel.deployment_end",
        "personnel.is_archived",
        "personnel.team_id",
        "team_name"
      )
      .where("personnel.is_archived", true)
      .orderBy("personnel.last_name");
    (await (!data || data.length))
      ? res.status(200).send(data)
      : res.status(404).send(`Personnel endpoint experiencing difficulties.`);
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

//archived Teams Endpoint
app.get("/archives/teams", async (req, res) => {
  try {
    let data = await knex("teams")
      .select("*")
      .where("teams.is_archived", true)
      .orderBy("teams.team_name");
    (await (!data || data.length))
      ? res.status(200).send(data)
      : res.status(404).send("Teams endpoint experiencing difficulties.");
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

/////////////////////////////////////////////////////////////  DELETE  ////////////////////////////////////////////////////////////
//delete mission by id endpoint
app.delete("/missions/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await knex("missions").where("id", id).update({
      is_archived: true,
      status: "Archived",
    });
    res.status(202).send(`Mission with id ${id} successfully deleted.`);
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

//delete personnel by id endpoint
app.delete("/personnel/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await knex("personnel").where("id", id).update({
      is_archived: true,
      status: "Archived",
    });
    res.status(202).send(`Personnel with id ${id} successfully deleted.`);
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

//delete team by id endpoint
// if a team is deleted("archived") => every mission and personnel with that corresponding team_id has their team_id updated to 1.
app.delete("/teams/:id", async (req, res) => {
  const team_id = parseInt(req.params.id);
  try {
    if (team_id === 1) {
      res.status(400).send("Team 1 can not be deleted.");
    } else {
      await knex("personnel").where("team_id", team_id).update({
        team_id: 1,
      });
      await knex("missions").where("team_id", team_id).update({
        team_id: 1,
      });
      await knex("teams").where("id", team_id).update({
        is_archived: true,
      });
      res.status(202).send(`Team with id ${team_id} successfully deleted.`);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("There was an error processing your request.");
  }
});

/////////////////////////////////////////////////////////////  POST  ////////////////////////////////////////////////////////////
//mission post endpoint
app.post("/missions", async (req, res) => {
  const maxIdQuery = await knex("missions").max("id as maxId").first();
  let num = maxIdQuery.maxId + 1;
  try {
    let newMission = {
      id: num,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      location: req.body.location,
      name: req.body.name,
      description: req.body.description,
      status: "Pending",
      purpose: req.body.purpose,
      authority: req.body.authority,
      end_state: req.body.end_state,
      transportation_methods: req.body.transportation_methods,
      timeline: req.body.timeline,
      pace: req.body.pace,
      risks: req.body.risks,
      decision_point: req.body.decision_point,
      is_archived: false,
      team_id: req.body.team_id,
    };
    await knex("missions").insert(newMission);
    res.status(201).send("Mission successfully created.");
  } catch (e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
});

//personnel post endpoint
app.post("/personnel", async (req, res) => {
  try {
    let newPersonnel = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rank: req.body.rank,
      mos: req.body.mos,
      email: req.body.email,
      status: req.body.status,
      city_base: req.body.city_base,
      country: req.body.country,
      deployment_start: req.body.deployment_start,
      deployment_end: req.body.deployment_end,
      is_archived: false,
      team_id: req.body.team_id,
    };
    await knex("personnel").insert(newPersonnel);
    res.status(201).send("Personnel successfully created.");
  } catch (e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
});

//team post endpoint
app.post("/teams", async (req, res) => {
  const maxIdQuery = await knex("teams").max("id as maxId").first();
  let num = maxIdQuery.maxId + 1;
  try {
    let newTeam = {
      id: num,
      team_name: req.body.team_name,
      location: req.body.location,
      comms_status: req.body.comms_status,
      personnel_status: req.body.personnel_status,
      equipment_status: req.body.equipment_status,
      is_archived: false,
    };
    await knex("teams").insert(newTeam);
    res.status(201).send("Team successfully created.");
  } catch (e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
});
/////////////////////////////////////////////////////////////  PUT  ////////////////////////////////////////////////////////////
//missions update endpoint
app.put("/missions/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let updatedMission = {
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      location: req.body.location,
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      purpose: req.body.purpose,
      authority: req.body.authority,
      end_state: req.body.end_state,
      transportation_methods: req.body.transportation_methods,
      timeline: req.body.timeline,
      pace: req.body.pace,
      risks: req.body.risks,
      decision_point: req.body.decision_point,
      team_id: req.body.team_id,
    };
    await knex("missions").where("id", id).update(updatedMission);
    res.status(201).send("Mission successfully updated.");
  } catch (e) {
    console.log(e);
    res.status(400).send(`Update failed`);
  }
});

//personnel update endpoint
app.put("/personnel/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let updatedPersonnel = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rank: req.body.rank,
      mos: req.body.mos,
      email: req.body.email,
      status: req.body.status,
      city_base: req.body.city_base,
      country: req.body.country,
      deployment_start: req.body.deployment_start,
      deployment_end: req.body.deployment_end,
      team_id: req.body.team_id,
    };
    await knex("personnel").where("id", id).update(updatedPersonnel);
    res
      .status(201)
      .send(
        `${updatedPersonnel.rank} ${updatedPersonnel.last_name} was successfully updated.`
      );
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .send(
        `Failed to update ${updatedPersonnel.rank} ${updatedPersonnel.last_name}`
      );
  }
});

//teams update endpoint
app.put("/teams/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (id !== 1) {
    try {
      let updatedTeam = {
        team_name: req.body.name,
        location: req.body.location,
        comms_status: req.body.comms_status,
        personnel_status: req.body.personnel_status,
        equipment_status: req.body.equipment_status,
      };
      await knex("teams").where("id", id).update(updatedTeam);
      res.status(201).send(`Team was successfully updated.`);
    } catch (e) {
      console.log(e);
      res.status(400).send(`Update failed`);
    }
  } else {
    res.status(404).send("Team 1 cannot be updated");
  }
});

module.exports = app;
