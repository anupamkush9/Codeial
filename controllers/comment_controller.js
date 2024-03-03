const Comment = require('../models/comment');
const Post = require("../models/post");
const commentMailer = require('../mailers/comments_mailer');
const Like = require('../models/like');

module.exports.create = function(req,res){
    // console.log("entered");
    // console.log(req.body);
    Post.findById(req.body.post).then((post)=>{
        // console.log(post);
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            }).then((comment)=>{
                post.comments.push(comment);
                post.save();  // whenever updating database call save(). to save final version

                // sending mail
                comment.populate('user').then((cmt)=>{
                    commentMailer.newComment(cmt);
                }).catch((err)=>{
                    console.log(err);
                });

                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            comment : comment,
                            name : req.user.name,
                            message : "comment created succefully"
                            
                        }
                    })
                }

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

            // change : Destroy the assciated likes for this comment
            Like.deleteMany({likable : comment._id, onModel: 'Comment'});

            //Deleting comment
            Comment.findByIdAndDelete(req.params.id).then(()=>{
                console.log("deleted");
            });

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id
                    },
                    message : "comment deleted successfully"
                })
            }

            req.flash('success', 'Comment deleted successfully !');
            res.redirect('/');
        }else{
            res.redirect('/');
        }
    }).catch((err)=>{
        console.log("can't find comment", err);
    })
}