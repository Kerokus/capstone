const express = require("express");
const knex = require("knex")(require("../knexfile.js")["development"]);
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).send("Server is online");
});

module.exports = app;
