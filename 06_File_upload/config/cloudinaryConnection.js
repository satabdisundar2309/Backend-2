//! cloudinary connection
// importing cloudinary package
const cloudinary = require('cloudinary').v2 //v2 is the latest version
require('dotenv').config()

const cloudinaryConnect = ()=>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
    } catch (error) {
        console.log("Couldn't connect to cloudinary")
        console.log(error)
    }
}

module.exports = cloudinaryConnect;