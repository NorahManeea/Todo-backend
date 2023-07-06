const express = require("express");
require('dotenv').config();
const {databaseConnection} = require("./config/db")


//Connection to DB
databaseConnection();

//Init App
const app = express();

//Apply Middlewares 
app.use(express.json());


app.use("/todo", require("./routes/todo"));


// Running the server
const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));