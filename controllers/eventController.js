const Event = require("../models/Event");
const bcrypt = require("bcryptjs");

const getEvents = (request, response) => {
  return response.json({ ok: true, msg: "Index de eventos" });
};

const createEvent = (request, response) => {
  return response.json({ ok: true, msg: "creacion de eventos" });
};

const updateEvent = (request, response) => {
  return response.json({ ok: true, msg: "update de eventos" });
};

const deleteEvent = (request, response) => {
  return response.json({ ok: true, msg: "delete de eventos" });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
