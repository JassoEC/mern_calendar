const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

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

    const token = await generateJWT(user.id, user.name);

    await user.save();
    response.status(201).json({
      msg: "Registro exitoso",
      data: user,
      token,
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

    const token = await generateJWT(user.id, user.name);

    response.json({
      ok: true,
      udi: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    response.status(500).json({
      msg: "Error interno de servidor",
    });
  }
};

const refreshToken = async (request, response) => {
  const { uid, name } = request;

  const token = await generateJWT(uid, name);
  response.json({
    msg: "refresh Token",
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  login,
  refreshToken,
};
