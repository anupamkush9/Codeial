const post = require('../models/post');
const user = require("../models/user");

module.exports.home = function(req,res){
    let postsContent ;

    post.find()
    .sort('-createdAt')
    .populate('user')
    .populate({
        path : 'comments',
        populate : [
            {path : 'user'},
            {path : 'likes'}
        ]

    })
    .populate('likes')
    .then((data)=>{
        user.find({}).then((user)=>{
            return  res.render('home', {
                  title : "Home",
                  posts : data,
                  all_users : user
              });
        })
    }).catch((err)=>{
        console.log("err while finding posts",err);
    });

}

module.exports.about = function(req,res){
    res.render('home', {
        title : "About"
    })
}
