const { request, response } = require("express");

const createUser = (request, response) => {
  response.json({
    message:' signUp'
  });
}

const login = (request,response) => {
  response.json({
    message: 'Login usuario'
  })
}

const refreshToken = (request, response) => {
  response.json({
    message: 'refresh Token'
  })
}

module.exports = {
  createUser,
  login,
  refreshToken,
};