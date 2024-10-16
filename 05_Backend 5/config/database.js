const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.DATABASE_URL

const dbConnect = async ()=>{
        mongoose.connect(url).then(()=>{
            console.log("DB Connection is successful")
        }).catch((err)=>{
            console.log("Error occured while DB Connection:- "+err)
            process.exit(1)
        })

}

module.exports = dbConnect;