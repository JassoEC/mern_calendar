const express = require('express');
require('dotenv').config()

// express server
const app = express();

// Public Path
app.use(express.static('public'))

// Routes
app.use('/api/auth',require('./routes/auth'));

//listen request
app.listen(process.env.PORT, ()=>{
  console.log(`server running in port ${process.env.PORT}`);
});