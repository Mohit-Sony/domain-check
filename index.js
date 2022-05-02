const port = 8500;
const express = require('express');
const app = express();
const env = require('./config/environment');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser')
// const sassMiddleware =require('node-sass-middleware');
const MongoDbStore = require('connect-mongo');
const request = require('request');
// const http = require('http');
var cors = require('cors');
const passportGoogle = require('./config/passport-google-strategy');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

//


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// app.set('layout','./layouts/any.ejs')
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views','./views');


//static folder setup
//cookie 
//cookie parser
//url encoded
//ejs layout 
//layout css scripts extraction 
//cookie session 


//mongo store is used to store this session on db
app.use(session({
    name: 'name',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 60 * 24)
    },
    store: MongoDbStore.create({
        mongoUrl: env.mongoUrl,
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setflash);

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`error in starting the server ${err}`);
        return ;
    }
    else{
        console.log(`Your server is up and running on port : ${port}`)
    }
});