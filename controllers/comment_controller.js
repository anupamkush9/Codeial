const Comment = require('../models/comment');
const Post = require("../models/post");

module.exports.create = function(req,res){
    Post.findById(req.body.post).then((post)=>{
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            }).then((comment)=>{
                post.comments.push(comment);
                post.save();  // whenever updating database call save(). to save final version
                req.flash('success', 'Comment created successfully !');
                res.redirect('/');
            }).catch((err)=>{
                console.log("err while creating comment");
            })
        }
    }).catch((err)=>{
        console.log("err while finding post in creating comment");
    })
}

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id).then((comment)=>{
        // checking user who created comment is deleting or not
        if(req.user.id == comment.user){
            let postId = comment.post;
            // Deleting objectId of comment from post
            Post.findByIdAndUpdate(postId, {$pull : {comments:req.params.id}}).then((id)=>{
                console.log(id);
            });
            //Deleting comment
            Comment.findByIdAndDelete(req.params.id).then(()=>{
                console.log("deleted");
            });
            req.flash('success', 'Comment deleted successfully !');
            res.redirect('/');
        }else{
            res.redirect('/');
        }
    }).catch((err)=>{
        console.log("can't find comment", err);
    })
}