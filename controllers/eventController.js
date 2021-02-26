const Event = require("../models/Event");

const createEvent = async (request, response) => {
  try {
    const newEvent = new Event(request.body);
    newEvent.userId = request.uid;

    const eventSaved = await newEvent.save();
    return response.json({
      ok: true,
      data: eventSaved,
      msg: "Evento registrado correctamente",
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ ok: false, msg: "Contacte a su administrador" });
  }
};

const getEvents = (request, response) => {
  return response.json({ ok: true, msg: "Index de eventos" });
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
