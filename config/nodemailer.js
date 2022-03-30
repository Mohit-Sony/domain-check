const nodeMailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

//autharize with smtp or google to send email 
let transporter = nodeMailer.createTransport({
    service:'gmail',
    host:'smtp.google.com',
    port:587,
    secure:false,
    auth:{
        user:'imohitsoni28@gmail.com',
        pass:'Asdf@#1234',
    }
});

//load the html template for mail 
let renderTemplate = (data,relativePath)=>{
    let mailHTML ;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log(`error in rendering html template : ${err}`);
                return;
            }
              mailHTML = template;
        }
    );
    return mailHTML;

}


module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}

//send mail request 
