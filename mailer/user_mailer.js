const nodeMailer = require('../config/nodemailer');
const ejs = require('ejs');

exports.newComment = (comment)=>{
    //send mail to given destination(user's mail address)
    let htmlString = nodeMailer.renderTemplate(comment,'/comment/new_comment_added.ejs');

    nodeMailer.transporter.sendMail({
        from:'imohitsoni28@gmail.com',
        to:comment.user.email,
        subject:'new comment added sucessfully',
        html:htmlString,
        
    },(err,info)=>{
        if(err){
            console.log(`error while sending mail : ${err}`);
            return;
        }

        console.log(`mail sent : ${info}`);
        console.log(info);
        return; 
    })

}
exports.forgot_password = function(user,authentication_key){


    let htmlString = nodeMailer.renderTemplate(user,'/forgot_password.ejs');

    nodeMailer.transporter.sendMail({
        from:'imohitsoni28@gmail.com',
        to:user.email,
        subject:'Pssword Reset',
        html:htmlString,
        
    },(err,info)=>{
        if(err){
            console.log(`error while sending mail : ${err}`);
            return;
        }

        console.log(`mail sent : ${info}`);
        console.log(info);
        return; 
    })
}

