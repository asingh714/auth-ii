require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../api/secrets");
const Users = require("../database/dbConfig");

router.post("/register", (req, res) => {
  const user = req.body;

  if (!user.username || !user.password || !user.department) {
    res.status(400).json({
      error: "Please provide a username, password and department."
    });
  } else {
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    Users("users")
      .insert(user)
      .then(ids => {
        const id = ids[0];
        Users("users")
          .where({ id })
          .first()
          .then(user => {
            const token = generateToken(user);
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

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "1d" // 1 day
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
