/**
 * Event Routes
 * host + api/event
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJwt");
const { validateFields } = require("../middlewares/validationFields");
const { isDate } = require("../helpers/isDate");

const {
  getEvents,
  deleteEvent,
  updateEvent,
  createEvent,
} = require("../controllers/eventController");

const router = Router();

router.use(validateJWT);

router.post(
  "/",
  [
    check("title").not().isEmpty().withMessage("Ingresa el titulo"),
    check("startDate")
      .not()
      .isEmpty()
      .withMessage("Ingresa la fecha de inico")
      .custom(isDate)
      .withMessage("Ingresa una fecha valida"),
    check("endDate")
      .not()
      .isEmpty()
      .withMessage("Ingresa la fecha de finalización")
      .custom(isDate)
      .withMessage("Ingresa una fecha valida"),
    check("userId").not().notEmpty().withMessage("A que usuario pertence"),
    validateFields,
  ],
  createEvent
);
router.get("/", getEvents);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

module.exports = router;
