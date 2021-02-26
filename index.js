const { request } = require("express");
const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./db/config");
const cors = require("cors");

// express server
const app = express();

// Mongo Connection
dbConnection();

// Cors
app.use(cors());

// Public Path
app.use(express.static("public"));

// Request parse
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/event", require("./routes/eventRoutes"));

//listen request
app.listen(process.env.PORT, () => {
  console.log(`server running in port ${process.env.PORT}`);
});
