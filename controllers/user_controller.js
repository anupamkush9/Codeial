const User = require('../models/user');

module.exports.userGet = function(req,res){
    res.send("<h1>user profile page of Codial</h1>");
}

module.exports.signUp = function(req,res){
    res.render('sign_up',{ title : "signUp"})
}

module.exports.signIn = function(req,res){
    res.render('sign_in', {title : "signIn"})
}

module.exports.userCreate = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}).then((data)=>{
        if(data){
            return res.redirect('/user/sign-in');
        }else{
            User.create(req.body).then((data)=>{
                console.log(data);
                return res.redirect('/user/sign-in');
            }).catch((err)=>{
                console.log('err while creating user :', err);
            })
        }
    })
}

module.exports.createSession = function(req,res){
    // todo later
} 