const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

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

const login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({
        msg: "Datos incorrectos",
      });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return response.status(400).json({
        msg: "Verifica la contraseña",
      });
    }

    response.json({
      msg: "Login usuario",
      data: user,
    });
  } catch (error) {
    response.status(500).json({
      msg: "Error interno de servidor",
    });
  }
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
