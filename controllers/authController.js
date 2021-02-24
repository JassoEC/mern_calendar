const { request, response } = require("express");
const { validationResult } = require("express-validator");

const createUser = (request, response) => {
  const { name, email, password } = request.body;

  // error handling

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  response.status(201).json({
    msg: " signUp",
    name,
    email,
    password,
  });
};

const login = (request, response) => {
  const { email, password } = request.body;

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

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
