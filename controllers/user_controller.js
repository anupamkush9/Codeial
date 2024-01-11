const User = require('../models/user');

module.exports.userProfile = function(req,res){
    User.findById(req.params.id).then((user)=>{
        return res.render('profile',{
            title : "profile page",
            profile_user : user
        });
    })
   
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body).then((user)=>{
           return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized access');
    }
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