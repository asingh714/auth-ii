require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const tokenService = require('../auth/token-service.js');
const UsersDB = require("../database/dbConfig");
const restricted = require("../auth/restricted");

router.post("/register", (req, res) => {
  const user = req.body;

  if (!user.username || !user.password || !user.department) {
    res.status(400).json({
      error: "Please provide a username, password and department."
    });
  } else {
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    UsersDB("users")
      .insert(user)
      .then(ids => {
        const id = ids[0];
        UsersDB("users")
          .where({ id })
          .first()
          .then(user => {
            const token = tokenService.generateToken(user);
            res.status(201).json({ user, token });
          });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
      });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      error: "Please provide a username and password"
    });
  } else {
    UsersDB("users")
      .where({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = tokenService.generateToken(user);
          res
            .status(200)
            .json({ message: `${user.username} is logged in.`, token });
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while logging in."
        });
      });
  }
});

router.get("/users", restricted, (req, res) => {
  UsersDB("users")
    .select("id", "username", "department")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/users/department", restricted, (req, res) => {
  UsersDB("users")
  .where({ department: req.decodedJwt.department })
  .select("id", "username", "department", "password")
  .then(users => {
    res.json(users);
  })
  .catch(err => res.send(err));
})



module.exports = router;
