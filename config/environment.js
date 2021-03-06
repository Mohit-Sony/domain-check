const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs')
fs.existsSync(logDirectory ) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access_log',{
    interval : '1d',
    path: logDirectory
})

let development = {
    name:'development',
    session_cookie_key:'blahsomething',
    mongoUrl:'mongodb://localhost/domain-check',
    smtp_user:'imohitsoni28@gmail.com',
    smtp_pass:'Asdf@#1234',
    aouth_clientID: "1016003462984-37iti7aa4pph7t7ghe4dvuctn09avdan.apps.googleusercontent.com",
    aouth_clientSecret: "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",
    aouth_callbackURL: "http://sonimohit.in/user/auth/google/callback",
    asset_path:'/assets',
    morgan:{
        mode:'dev',
        options: {stream : accessLogStream}
    },
    mongo_db_pass:'G5G0SVVetql3bs4u',
    mongo_db_username:'Financeuser',
    mongo_db_name:'Domain_development',
    
}

let production = {
    name:'production',
    session_cookie_key:process.env.DOMAIN_SESSION_COOKIE_KEY,
    mongoUrl:process.env.DOMAIN_MONGO_URL,
    smtp_user:process.env.DOMAIN_SMTP_USER,
    smtp_pass:process.env.DOMAIN_SMTP_PASS,
    aouth_clientID: process.env.DOMAIN_AOUTH_CLIENTID,
    aouth_clientSecret: process.env.DOMAIN_AOUTH_CLIENTSECRET,
    aouth_callbackURL: process.env.DOMAIN_AOUTH_CALLBACKURL,
    asset_path:'/public/assets',
    morgan:{
        mode:'combined',
        options: {stream : accessLogStream}
    },
    mongo_db_pass:process.env.DOMAIN_MONGO_DB_PASS,
    mongo_db_username:process.env.DOMAIN_MONGO_DB_USERNAME,
    mongo_db_name:process.env.DOMAIN_MONGO_DB_NAME,
}

// console.log(production)
console.log(production.aouth_callbackURL)
module.exports = production