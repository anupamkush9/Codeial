const post = require('../models/post');

module.exports.home = function(req,res){
    let postsContent ;

    post.find().populate('user').then((data)=>{
      return  res.render('home', {
            title : "Home",
            posts : data
        });
    }).catch((err)=>{
        console.log("err while finding posts",err);
    });

}

module.exports.about = function(req,res){
    res.render('home', {
        title : "About"
    })
}