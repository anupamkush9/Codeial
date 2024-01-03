const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :  {
        type : String,
        required : true
    },
    email : {
        type : String,
        required  : true,
        unique : true
    },
    password : {
        type : String,
        required  : true
    }
},{
    timestamp : true
});

const user = new mongoose.model('user',userSchema);

module.exports = user;