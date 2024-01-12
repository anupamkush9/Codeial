const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create= function(req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    }).then((data)=>{
        req.flash('success', 'Post created successfully !');
        res.redirect('back');
    }).catch((err)=>{
        console.log("con't create post", err);
    })
}

module.exports.destroy = function(req,res){
    console.log(req.params.id);
    Post.findById(req.params.id).then((post)=>{
        // checking user who created post is deleting or not
        // .id means converting object id into string.
        if(post.user == req.user.id){
            //Deleting post
            Post.deleteOne({_id : req.params.id}).catch((err)=>{
                console.log(err);
            })
            //Deleting post comments
            Comment.deleteMany({post : req.params.id}).catch((err)=>{
                console.log("err while deleting comment");
            })
            req.flash('success', 'Post deleted successfully !');
            res.redirect('/');
        }else{
            res.redirect('/');
        }
    }).catch((err)=>{
        console.log("could not find post with given id in destroy function of post",err);
    })
}