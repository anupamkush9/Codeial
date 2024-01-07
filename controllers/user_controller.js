const User = require('../models/user');

module.exports.userProfile = function(req,res){
    return res.render('profile',{
        title : "profile page"
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    res.render('sign_up',{ title : "signUp"})
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    
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
    // passport authenticate user then it send to controller
    return res.redirect('/');
} 

module.exports.destroySession = function(req,res){
    req.logout((err) => {
        if (err) {
          return res.redirect('back');
        }
        
      });
    return res.redirect('/');
}