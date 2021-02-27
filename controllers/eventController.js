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

const getEvents = async (request, response) => {
  const events = await Event.find().populate("userId", "name");
  return response.json({
    ok: true,
    data: events,
  });
};

const updateEvent = async (request, response) => {
  try {
    const eventId = request.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return response
        .status(404)
        .json({ ok: false, msg: "No existe elemento" });
    }
    if (event.userId.toString() !== request.uid) {
      return response
        .status(401)
        .json({ ok: false, msg: "Acción no autorizada" });
    }

    const updateEventData = { ...request.body, userId: request.uid };

    const updatedEvent = await Event.findOneAndUpdate(
      eventId,
      updateEventData,
      { new: true }
    );

    return response.json({ ok: true, data: updatedEvent });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ ok: false, msg: "Error interno" });
  }
};

const deleteEvent = async (request, response) => {
  try {
    const eventId = request.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return response
        .status(404)
        .json({ ok: false, msg: "No existe elemento" });
    }
    if (event.userId.toString() !== request.uid) {
      return response
        .status(401)
        .json({ ok: false, msg: "Acción no autorizada" });
    }

    await Event.findByIdAndDelete(eventId);
    return response.json({ ok: true, msg: "Eliminacion correcta" });
  } catch (error) {
    return response.status(500).json({ ok: true, msg: "Error interno" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
