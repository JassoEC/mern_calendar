const { request, response } = require("express");
const { validationResult } = require("express-validator");

const createUser = (request, response) => {
  const { name, email, password } = request.body;

  response.status(201).json({
    msg: " signUp",
    name,
    email,
    password,
  });
};

const login = (request, response) => {
  const { email, password } = request.body;

  response.json({
    msg: "Login usuario",
    email,
    password,
  });
};

const refreshToken = (request, response) => {
  response.json({
    msg: "refresh Token",
  });
};

module.exports = {
  createUser,
  login,
  refreshToken,
};
