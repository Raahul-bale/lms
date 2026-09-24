const express = require("express");
const { login, register } = require("../controller/authController");

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);

module.exports = authRoute;

