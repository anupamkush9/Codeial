const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.posts = function(req,res){
    return res.status(200).json({
        messsage : "list of posts",
        posts : []
    })
}

module.exports.destroy = function(req,res){
    console.log(req);
     Post.findById(req.params.id).then((post)=>{
        // checking user who created post is deleting or not
        // .id means converting object id into string.
        if(post.user == req.user.id){
            Post.deleteOne({_id : req.params.id}).catch((err)=>{
                console.log(err);
            })
            //Deleting post comments
            Comment.deleteMany({post : req.params.id}).catch((err)=>{
                console.log("err while deleting comment");
            })

            return res.json(200, {
                message : "Post and Associate comments deleted successfully"
            })
        }else{
           return res.json(401,{
            message : "you cannot delete this post"
           })
        }
    
    }).catch((err)=>{
        console.log(err);
            return res.json(500, {
                message : "your postId is wrong"})
        })
}