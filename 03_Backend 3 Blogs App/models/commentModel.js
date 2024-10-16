const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post" //this is a reference to the "Post" model/collection
        },
        user: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
})

const commentModel = mongoose.model('Comment', commentSchema);

module.exports = commentModel;