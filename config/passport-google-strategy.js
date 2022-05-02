const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('./../models/user');
const env = require('./environment');


passport.use(new googleStrategy({
        clientID: env.aouth_clientID,
        clientSecret: env.aouth_clientSecret,
        callbackURL: env.aouth_callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log(`error in passport google auth : ${err}`);
                return;
            }
            console.log(profile);

            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),

                },function(err,user){
                    if(err){
                        console.log(`error in passport google auth creating new user : ${err}`);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
  }
));