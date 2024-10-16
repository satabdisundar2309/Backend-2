const express = require('express')
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000

app.use(express.json());

const routes = require('./routes/routes');
app.use('/api/v1',routes)

const dbConnect = require('./config/database')
dbConnect();

app.get('/',(req,res)=>{
    res.send("hello blogs")
})
app.listen(PORT)