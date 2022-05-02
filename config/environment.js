let development = {
    name:'development',
    session_cookie_key:'blahsomething',
    mongoUrl:'mongodb://localhost/domain-check',
    smtp_user:'imohitsoni28@gmail.com',
    smtp_pass:'Asdf@#1234',
    aouth_clientID: "1016003462984-37iti7aa4pph7t7ghe4dvuctn09avdan.apps.googleusercontent.com",
    aouth_clientSecret: "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",
    aouth_callbackURL: "http://localhost:8500/user/auth/google/callback",
    
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
}

console.log(production)
module.exports = development