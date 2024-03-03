const mongoose = require('mongoose');
const User = require('./user');

const postSchema = new mongoose.Schema({
    content : {
        type : String,
        require : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    // include arrays of ids of all comments in this post
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'comment'
        }
    ],
    likes: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
},{
    timestamps : true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;