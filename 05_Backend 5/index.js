const express = require('express')
const app = express();

// importing cookie-parser middleware
const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(express.json())

require('dotenv').config();
const port = process.env.PORT || 5000

const dbConnect = require('./config/database')
dbConnect();

const router = require('./routes/routes');
app.use("/api/v1", router);

app.get("/",(req,res)=>{
    res.send("Hello and welcome to authzzzzz");
})


app.listen(port,()=>{
    console.log(`App is listening at port no. ${port}`);
})