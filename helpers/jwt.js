const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Error en generacion de token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
