const express = require('express')
const app = express();

// importing the PORT number from .env file
require('dotenv').config();
const PORT = process.env.PORT || 8000

// middleware to parse json body request
app.use(express.json()) //body parser

// importing the routes for todo API
const todoRoutes = require('./routes/todoRoute');

// mounting the todo API routes
app.use("/api/v1", todoRoutes)

// connecting to the database
const dbConnect = require('./config/database')
dbConnect();

// defining default route
app.get('/',(req,res)=>{
    res.send('<h1>This is my home page baby</h1>')
})

app.listen(PORT)