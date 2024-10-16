const postModel = require('../models/postModel');

const postControllerPost = async (req,res)=>{
    try {
        const data = new postModel(req.body);
        const result = await data.save();
        res.send(result)
    } 
    catch (error) {
        res.status(501).json({
            error: "Error while creating a post",
            message: error.message
        })
    }
}
const postControllerGet = async (req,res)=>{
    try {
        const result = await postModel.find({});
        res.send(result)
    } 
    catch (error) {
        res.status(501).json({
            error: "Error while creating a posts",
            message: error.message
        })
    }
}

module.exports = {postControllerGet, postControllerPost}