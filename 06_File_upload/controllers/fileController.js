const fileModel = require('../models/fileModel')
const cloudinary = require('cloudinary').v2


//? creating handler function for local file upload
const localFileupload = async (req, res)=>{
    try {
        // fetching the file from the request
        const file = req.files.file; //here the "file" in the right side is the name of the key that we set during sending request in postman
        console.log("File aa gaya jee --> ", file)

        // declaring file path that where to upload on server
        const path = __dirname + "/uploads/"+ Date.now()+ `.${file.name.split('.')[1]}`;
        console.log("PATH --> ", path)

        // uploading file with mv() method of express-fileupload package
        file.mv(path, ()=>{
            console.log("File Uploaded")
        })

        // sending response
        res.json({
            succes: true,
            message: "Local file uploaded successfull..."
        })
    } catch (error) {
        res.json({
            succes: false,
            message: "Local file uploaded failed..."
        })
    }
}


//! cloudinary operations
//? file supported or not
function isFileTypeSupported(fileType, supportedFileTypes){
    return supportedFileTypes.includes(fileType)
}

//? upload to cloudinary
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder}
    options.resource_type = "auto"; //if you dont include this line then you will only be able to upload images to cloudinary
    if(quality){
        options.quality = quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
} 

//? creating handler for image upload in cloudinary
const imageUpload = async (req,res)=>{
    try {
        // fetching data
        const {name, email, tags} = req.body;
        console.log(name, email, tags)

        // fetching file
        const file = req.files.imageFile;
        console.log(file)

        // filetype validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({
                succes: false,
                message: "File type not supported"
            })
        }

        // uploading to cloudinary
        const response = await uploadFileToCloudinary(file, "FileUploadSatabdi"); //"FileUploadSatabdi" is the folder that we created in cloudinary
        console.log(response)
        const imageUrl = response.secure_url; //this response.secure_url wull give us the exact url of our image in cloudinary

        // inserting data in databse
        const fileData = await fileModel.create({
            name: name,
            email: email,
            imageURL: imageUrl,
            tags: tags
            
         })

         console.log(fileData)

        res.status(201).json({
            succes: true,
            message: "Cloudinary Image uploaded successfull..."
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            succes: false,
            message: "Cloudinary Image uploaded failure..."
        })
    }
}

//? creating handler for video upload in cloudinary
const videoUpload = async (req,res)=>{
    try {

        const {name, email, tags} = req.body;
        console.log(name, email, tags)

        const file = req.files.videoFile;
        console.log(file)

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split(".")[1].toLowerCase();
        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({
                succes: false,
                message: "File type not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "FileUploadSatabdi");
        console.log(response)
        const videoUrl = response.secure_url;

        const fileData = await fileModel.create({
            name: name,
            email: email,
            videoURL: videoUrl,
            tags: tags
            
         })

         console.log(fileData)

        res.status(201).json({
            succes: true,
            message: "Cloudinary video uploaded successfull..."
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            succes: false,
            message: "Cloudinary video uploaded failure..."
        })
    }
}


//? creating handler for reduce image size and  upload in cloudinary
const imageSizeReduceUpload = async (req,res)=>{
    try {

        const {name, email, tags} = req.body;
        console.log(name, email, tags)

        const file = req.files.imageFile;
        console.log(file)

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({
                succes: false,
                message: "File type not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "FileUploadSatabdi", 30); //the 30 is the quality to which the photo will be reduced to
        console.log(response)
        const imageUrl = response.secure_url;

        const fileData = await fileModel.create({
            name: name,
            email: email,
            imageURL: imageUrl,
            tags: tags
            
         })

         console.log(fileData)

        res.status(201).json({
            succes: true,
            message: "Cloudinary image reduce and uploaded successfull..."
        })
        

    } catch (error) {
        console.log(error)
        res.status(400).json({
            succes: false,
            message: "Cloudinary image reduce and uploaded failure..."
        })
    }
}
module.exports = {localFileupload, imageUpload, videoUpload, imageSizeReduceUpload};