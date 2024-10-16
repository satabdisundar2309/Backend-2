const mongoose = require('mongoose')
const nodemailer = require('nodemailer') //importing nodemailer package
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    imageURL:{
        type: String
    },
    videoURL:{
        type: String
    },
    tags: {
        type: String
    }
})


//? Using post middleware for sending email using nodemailer
fileSchema.post("save", async function(doc){
    try {
        console.log("Document: ", doc) //this will print the data which was saved in the db

        // creating a transporter using nodemailer
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASSWORD
            }
        })

        // Sending mail
        let info = await transporter.sendMail({
            from : "Satabdisundar Behera",
            to: doc.email,
            subject: "File uploaded to cloudinary and DB updated as well",
            html: `<h1>Hello ${doc.name}</h1>
            <p>Your Details are: </p>
            <div><h3>Email: ${doc.email}</h3> <hr/>
            <h3>Email: ${doc.tags}</h3> <hr/>
            <h3>URL: ${doc.videoURL ? `<h3>${doc.videoURL}</h3>` : `<h3>${doc.imageURL}</h3>`}</h3>
            </div>` 
        })

        console.log(info)

    } catch (error) { 
        console.log(error)
    }
})



const fileModel = mongoose.model("UserFile", fileSchema)
module.exports = fileModel;