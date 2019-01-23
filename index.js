

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const server = express();

const db = knex(knexConfig.development);


server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send("I AM WORKING");
});


server.post("/api/register", (req, res) => {
    const userInfo = req.body;

    const hash = bcrypt.hashSync(userInfo.password, 14);

    userInfo.password = hash;

    db("users").insert(userInfo)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while creating the user." })
    })

})




server.listen(5000, () => console.log("\nrunning on port 5000\n"));