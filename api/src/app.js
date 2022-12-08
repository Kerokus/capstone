const express = require('express')
const knex = require('knex')(require('../knexfile.js')['development'])
const cors = require('cors');
const app = express();


app.use(express.json())
app.use(cors())

//helper functions
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
app.delete('/teams/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    await knex('teams').where('id', id).update({
      is_archived: true
    });
    res.status(202).send(`Team with id ${id} successfully deleted.`)
  } catch (e) {
    console.log(e);
    res.status(400).send('There was an error processing your request.');
  }
})

module.exports = app;
