const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// express ejs layouts setup
const expressLayout = require('express-ejs-layouts');
const { mongo } = require('mongoose');

app.use(expressLayout);

// static file setup : static file means css, script, img etc
app.use(express.static(__dirname + '/assets'));

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up  view engine
app.set('view engine', 'ejs');
app.set('views',  path.join(__dirname,'./views') );

app.use(session({
    name : 'codial',
    // ToDo change the secret before deployment in production mode

    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100) // it is session timeout calculated in miliseconds.
    },
    store: MongoStore.create({
        mongoUrl : 'mongodb://127.0.0.1:27017/codeial',
        autoRemove : 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// use express router to handle all routes
app.use('/', require('./routes/index')); // This means all routes defined in the router will be prefixed with '/app'

app.listen(port, function(err){
    if(err){
        console.log(`error in listening server at port : ${port}`);
    }

    console.log(`listen server at port : ${port}`);
});