const mongoose = require('mongoose');
const Post = require('./post');
const User = require('./user');

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        require : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    likes: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
},{
    timestamps : true
})

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;