const User = require("../models/User");

const createUser = async (request, response) => {
  const { name, email, password } = request.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({
        msg: "Ya existe un usuario registrado con ese correo",
      });
    }

    user = new User({ name, email, password });
    await user.save();
    response.status(201).json({
      msg: "Registro exitoso",
      data: user,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      msg: "Error interno",
    });
  }
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
