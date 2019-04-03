const middleware = require("../config/middleware");
const express = require("express");

const server = express();

middleware(server);

module.exports = server;