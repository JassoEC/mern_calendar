/**
 * Event Routes
 * host + api/event
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJwt");
const {
  getEvents,
  deleteEvent,
  updateEvent,
  createEvent,
} = require("../controllers/eventController");

const router = Router();

router.get("/", [validateJWT], getEvents);
router.post("/", [validateJWT], createEvent);
router.delete("/:id", [validateJWT], deleteEvent);
router.put("/:id", [validateJWT], updateEvent);

module.exports = router;
