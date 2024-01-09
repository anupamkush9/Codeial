const Comment = require('../models/comment');
const Post = require("../models/post");

module.exports.create = function(req,res){
    Post.findById(req.body.post).then((post)=>{
        console.log(post);
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            }).then((comment)=>{
                post.comment.push(comment);
                post.save();  // whenever updating database call save(). to save final version
                res.redirect('/');
            }).catch((err)=>{
                console.log("err while creating comment");
            })
        }
    }).catch((err)=>{
        console.log("err while finding post in creating comment");
    })
}