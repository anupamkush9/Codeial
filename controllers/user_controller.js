const User = require('../models/user');
const fs = require('fs'); // fs -> file system
const path = require('path');

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
        // User.findByIdAndUpdate(req.params.id, req.body).then((user)=>{
        //    return res.redirect('back');
        // });

        // console.log(req.body); // body not accessible because form enctype is multipart
       User.findById(req.params.id).then((user)=>{
 
            User.uploadedAvatar(req,res,function(err){
                    if(err){console.log('*****Multer ERROR : ',err)};

                    user.name = req.body.name;
                    user.email = req.body.email;

                    if(req.file){

                        // existsSysnc -> checks deleting file exists or not
                        if(user.avatar && fs.existsSync(path.join(__dirname,'..', user.avatar))){
                            // deleting already existing avatar image
                            fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                        }

                        //this is saving the path of uploaded file into the avatar field in the user.
                        user.avatar = User.avatarPath + "/" + req.file.filename;
                    }

                    user.save().then((data)=>{
                        console.log("user updated successfully");
                    }).catch((err)=>{
                        console.log("err in saving", err);
                    })
                    return res.redirect('back');
            })
              
        })
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
   req.flash('success', 'logged in successfully');
    // passport authenticate user then it send to controller
    return res.redirect('/');
} 

module.exports.destroySession = function(req,res){
    req.logout((err) => {
        if (err) {
          return res.redirect('back');
        }
        req.flash('success', 'logged out successfully');
        return res.redirect('/');
      });
      
    
}