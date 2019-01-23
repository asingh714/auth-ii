require("dotenv").config();

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

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.department
    }

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, secret, options)

}


server.post("/api/login", (req, res) => {
    const credentials = req.body;

    db("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `${user.username} is logged in.`, token })
        } else {
            res.status(401).json({ message: "You shall not pass!" })
        }
    })
    .catch(err => res.status(500).json(err));
})

function lock(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Invalid Token" })
            } else {
                req.decodedToken = decodedToken;
                next()
            }
        })
    } else {
        res.status(401).json({ message: "No token provided" })
    }
}


server.get("/api/users", lock, (req, res) => {
    db("users")
    .select("id", "username", "department", "password")
    .then(users => {
        res.status(200).json({ users })
    })
    .catch(err => res.send(err));
})






server.listen(5000, () => console.log("\nrunning on port 5000\n"));