const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post" //this is a reference to the "Post" model/collection
        },
        user: {
            type: String,
            required: true
        }
})

const likeModel = mongoose.model('Like', likeSchema);

module.exports = likeModel;