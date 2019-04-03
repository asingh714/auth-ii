const middleware = require("../config/middleware");
const express = require("express");

const authRouter = require("../auth/auth-router");

const server = express();
middleware(server);

server.use("/api", authRouter);

module.exports = server;
