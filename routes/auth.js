/**
 * Auth routes
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  createUser,
  login,
  refreshToken,
} = require("../controllers/authController");

router.post(
  "/signup",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email")
      .not()
      .isEmpty()
      .withMessage("El email es obligatorio")
      .isEmail()
      .withMessage("Ingeresa un correo válido"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Ingresa la contraseña")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe ser de al menos 6 caracteres"),
  ],
  createUser
);
router.post(
  "/",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("El email es obligatorio")
      .isEmail()
      .withMessage("Ingeresa un correo válido"),
    check("password").not().isEmpty().withMessage("Ingresa la contraseña"),
  ],
  login
);
router.get("/refresh/token", refreshToken);

module.exports = router;
