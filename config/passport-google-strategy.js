const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('./../models/user');

passport.use(new googleStrategy({
        clientID: "1016003462984-37iti7aa4pph7t7ghe4dvuctn09avdan.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8500/user/auth/google/callback"
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