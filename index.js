

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send("I AM WORKING");
});







server.listen(5000, () => console.log("\nrunning on port 5000\n"));