const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const port = 8000;

app.use(express.urlencoded());
app.use(cookieParser());

// express ejs layouts setup
const expressLayout = require('express-ejs-layouts');

app.use(expressLayout);

// static file setup : static file means css, script, img etc
app.use(express.static(__dirname + '/assets'));

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up  view engine
app.set('view engine', 'ejs');
app.set('views',  path.join(__dirname,'./views') );

// use express router to handle all routes
app.use('/', require('./routes/index')); // This means all routes defined in the router will be prefixed with '/app'

app.listen(port, function(err){
    if(err){
        console.log(`error in listening server at port : ${port}`);
    }

    console.log(`listen server at port : ${port}`);
});