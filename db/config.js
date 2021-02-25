const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("Error de incializacion de base de datos");
  }
};

module.exports = {
  dbConnection,
};
