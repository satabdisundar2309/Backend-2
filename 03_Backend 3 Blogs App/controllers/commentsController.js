const postModel = require('../models/postModel')
const commentModel = require('../models/commentModel')

const commentController = async (req,res)=>{
    try {
        const data = new commentModel(req.body);
        const result = await data.save();

        //? Find the post by id, and update the comment in its comment array
        const updatedPost = await postModel.findByIdAndUpdate({_id:req.body.post},{$push:{comments: result._id}},{new:true}); //new:true returns the updated post not the old one

        // ! Must watch the videos of this code for populate() method
        res.send(updatedPost)
    } 
    catch (error) {
        res.status(501).json({
            error: "Error while creating a comment",
            message: error.message
        })
    }
}

module.exports = commentController;