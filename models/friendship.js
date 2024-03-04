const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // user who sent this request
    from_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    // user who accepted this request, the naming is just to understand otherwise , the users won't see a difference
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
},{
    timestamps : true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;