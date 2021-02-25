const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./db/config");

// express server
const app = express();

// Mongo Connection
dbConnection();

// Public Path
app.use(express.static("public"));

// Request parese
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

//listen request
app.listen(process.env.PORT, () => {
  console.log(`server running in port ${process.env.PORT}`);
});
