const passport = require('passport');

const LocalStrategy =  require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true
    },
    function(req, email, password, done){
        // find a  user and establish  the identity 
        User.findOne({email:email}).then((user)=>{
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);

        }).catch((err)=>{
            req.flash('error','User does not exist please sign-up!')
            return done(err);
        });
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then((user)=>{
        return done(null,user);
    }).catch((err)=>{
        console.log('Error in finding user-->passport');
        return done(err);
    })
})

// Display user data on profile page
// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){  // it is our function will be used as middleware
    // if user is signed in , then pass on the request to the next function 
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Please login or signUp !')
    // if user is not signed in
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user: Typically, in authentication systems (using Passport.js or similar middleware), after a user is authenticated, their information is often stored in req.user.
        // res.locals: This is an Express feature that allows you to pass data to the view layer. Anything set in res.locals within a middleware function is accessible in the views or templates.
        res.locals.user = req.user;
    }

    next();
}
module.exports = passport;