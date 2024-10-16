const postModel = require('../models/postModel')
const likeModel = require('../models/likeModel')

const likeControllerLike = async (req,res)=>{
    try {
        const data = new likeModel(req.body);
        const result = await data.save();

        //? Find the post by id, and update the like in its likes array
        const updatedPost = await postModel.findByIdAndUpdate({_id:req.body.post},{
            $push:{
                likes: result._id
            }
        },{new:true});

        res.send(updatedPost)
    } 
    catch (error) {
        res.status(501).json({
            error: "Error while liking a post",
            message: error.message
        })
    }
}

const likeControllerUnlike = async (req,res)=>{
    try {
        const deletedLike = await likeModel.findOneAndDelete({$and:[{post:req.body.post},{_id:req.body.like}]})

        //? Find the post by id, and remove the like from its likes array
        const updatedPost = await postModel.findByIdAndUpdate({_id:req.body.post},{$pull:{likes: deletedLike._id}},{new:true});

        res.send([updatedPost, deletedLike])
    } 
    catch (error) {
        res.status(501).json({
            error: "Error while unliking a post",
            message: error.message
        })
    }
}

module.exports = {likeControllerLike, likeControllerUnlike};