const express = require('express')
const knex = require('knex')(require('../knexfile.js')['development'])
const cors = require('cors');
const app = express();


app.use(express.json())
app.use(cors())

//helper function (is called for GET requests)
const getRequest = async (endpoint, res, id) => {
  let data = null;
  if(!id){
    try{
      data = await knex(`${endpoint}`)
        .select('*')
        .where('is_archived', false)
    } catch (e) {
      console.log(e);
      res.status(400).send('There was an error processing your request.');
    }
  } else {
    try{
      data = await knex(`${endpoint}`)
        .select('*')
        .where('id', '=', id)
        .where('is_archived', false)
    } catch (e) {
      console.log(e);
      res.status(400).send('There was an error processing your request.');
    }
  }

  if (!data || data.length === 0) {
    res.status(404).send(`${endpoint} not found`);
  } else {
    res.status(200).send(data);
  }
}

/////////////////////////////////////////////////////////////  GET  ////////////////////////////////////////////////////////////
//missions endpoint
app.get('/missions', async (req, res) => {
  const mission = await getRequest('missions', res);
})

//personnel endpoint
app.get('/personnel', async (req, res) => {
  const mission = await getRequest('personnel', res);
})

//teams endpoint
app.get('/teams', async (req, res) => {
  const mission = await getRequest('teams', res);
})

//mission/:id endpoint
app.get('/missions/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const mission = await getRequest('missions', res, id);
})

//personnel/:id endpoint
app.get('/personnel/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const mission = await getRequest('personnel', res, id);
})

//teams/:id endpoint
app.get('/teams/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const mission = await getRequest('teams', res, id);
})

/////////////////////////////////////////////////////////////  DELETE  ////////////////////////////////////////////////////////////
//delete mission by id endpoint
app.delete('/missions/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    await knex('missions').where('id', id).update({
      is_archived: true
    });
    res.status(202).send(`Mission with id ${id} successfully deleted.`)
  } catch (e) {
    console.log(e);
    res.status(400).send('There was an error processing your request.');
  }
})

//delete personnel by id endpoint
app.delete('/personnel/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    await knex('personnel').where('id', id).update({
      is_archived: true
    });
    res.status(202).send(`Personnel with id ${id} successfully deleted.`)
  } catch (e) {
    console.log(e);
    res.status(400).send('There was an error processing your request.');
  }
})

//delete team by id endpoint
  // if a team is deleted("archived") => every mission and personnel with the corresponding team_id has their team_id updated to 1.
app.delete('/teams/:id', async (req, res) => {
  const team_id = parseInt(req.params.id);
  try{
    if (team_id === 1) {
      res.status(400).send("Team 1 can not be deleted.")
    } else {
      await knex('personnel').where('team_id', team_id).update({
        team_id: 1
      })
      await knex('missions').where('team_id', team_id).update({
        team_id: 1
      })
      await knex('teams').where('id', team_id).update({
        is_archived: true
      });
      res.status(202).send(`Team with id ${team_id} successfully deleted.`)
    }
  } catch (e) {
    console.log(e);
    res.status(400).send('There was an error processing your request.');
  }
})

/////////////////////////////////////////////////////////////  POST  ////////////////////////////////////////////////////////////
//post mission endpoint
app.post('/missions', async (req, res) => {
  const maxIdQuery = await knex('missions').max('id as maxId').first();
  let num = maxIdQuery.maxId + 1;
  try {
    let newMission = {
      id: num,
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
      is_archived: false,
      team_id: req.body.team_id,
    }
    await knex('missions').insert(newMission);
    res.status(201).send('Mission successfully created.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
})

//post personnel endpoint
app.post('/personnel', async (req, res) => {
  try {
    let newPersonnel = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rank: req.body.rank,
      mos: req.body.mos,
      email: req.body.email,
      status: req.body.status,
      location: req.body.location,
      deployment_start: req.body.deployment_start,
      deployment_end: req.body.deployment_end,
      is_archived: false,
      team_id: req.body.team_id,
    }
    await knex('personnel').insert(newPersonnel);
    res.status(201).send('Personnel successfully created.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
})

//post team endpoint
app.post('/teams', async (req, res) => {
  const maxIdQuery = await knex('teams').max('id as maxId').first();
  let num = maxIdQuery.maxId + 1;
  try {
    let newTeam = {
      id: num,
      name: req.body.name,
      location: req.body.location,
      comms_status: req.body.comms_status,
      personnel_status: req.body.personnel_status,
      equipment_status: req.body.equipment_status,
      is_archived: false
    }
    await knex('teams').insert(newTeam);
    res.status(201).send('Team successfully created.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
})
/////////////////////////////////////////////////////////////  PUT  ////////////////////////////////////////////////////////////
//missions update endpoint
app.put('/missions/:id', async (req, res) => {
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
    }
    await knex('missions').where('id', id).update(updatedMission);
    res.status(201).send('Mission successfully updated.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Update failed`);
  }
})

//personnel update endpoint
app.put('/personnel/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let updatedPersonnel = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rank: req.body.rank,
      mos: req.body.mos,
      email: req.body.email,
      status: req.body.status,
      location: req.body.location,
      deployment_start: req.body.deployment_start,
      deployment_end: req.body.deployment_end,
      team_id: req.body.team_id,
    }
    await knex('personnel').where('id', id).update(updatedPersonnel);
    res.status(201).send('Personnel successfully updated.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Update failed`);
  }
})

//teams update endpoint
app.put('/teams/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let updatedTeams = {
      name: req.body.name,
      location: req.body.location,
      comms_status: req.body.comms_status,
      personnel_status: req.body.personnel_status,
      equipment_status: req.body.equipment_status,
    }
    await knex('teams').where('id', id).update(updatedTeams);
    res.status(201).send('Team successfully updated.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Update failed`);
  }
})


module.exports = app;
