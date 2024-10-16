require('dotenv').config();
const express = require('express')
const app = express();
app.use(express.json())

const port = process.env.PORT || 5000;

// db connection
require('./config/dbConnection');

// importing cloudinary connection
const cloudinaryConnect = require('./config/cloudinaryConnection');
cloudinaryConnect();

// installing and using express-fileupload package and using it as a middleware (npm i express-fileupload), multer is an alternative
const fileupload = require('express-fileupload')
// app.use(fileupload()); //this fileupload is used to upload files in server and then upload them in the cloud by cloudinary's own upload method and then file from the server
app.use(fileupload({ // in the above app.use(fileupload()), it works only for uploading file in server
    useTempFiles: true,
    tempFileDir: "/tmp/"
})); //here these {useTempFiles: true, tempFileDir: "/tmp/"} is required inside fileupload() to upload files in cloudinary


// mounting the routes
const router = require('./routes/fileUpload');
app.use("/api/v1/upload", router);

app.get('/',(req,res)=>{
    res.send("Hello file upload")
})

app.listen(port,()=>{
    console.log(`Listening at port: ${port}`);
}) 