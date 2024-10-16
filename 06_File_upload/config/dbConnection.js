const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("DB Connection successful")
}).catch((err)=>{
    console.log("DB Connection failed")
    console.log(err)
})