const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        require : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
},{
    timestamps : true
})

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;