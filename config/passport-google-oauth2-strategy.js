const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID : "856394215775-5bfbp7bp3ls9elrk1siknqelvb6c7lt9.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/user/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email : profile.emails[0].value}).then((user)=>{
            // if(err){console.log('error in google strategy-passport',err); return ;}

            console.log(profile);

            if(user){
                // if found , set this user as req.user
                return done(null, user);
            }else{
                // if not found , create the user and set it as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }).then((data)=>{
                    return done(null,user);
                }).catch((err)=>{
                    console.log("error in creatinng google strategy passport",err);
                    return;
                })
            }
        }).catch((err)=>{
            if(err){console.log('error in google strategy-passport',err); return ;}
        })
    }
))