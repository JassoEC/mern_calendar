const { response } = require("express");
const jtw = require("jsonwebtoken");

const validateJWT = (req, resp = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return resp.status(401).json({
      msg: "invalid credenials",
    });
  }

  try {
    const { uid, name } = jtw.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    return resp.status(401).json({
      msg: "Unathenticated",
      ok: false,
    });
  }
};

module.exports = { validateJWT };
