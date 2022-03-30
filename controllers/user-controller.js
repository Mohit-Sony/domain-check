const User = require('../models/user');
const mailer = require('../mailer/user_mailer')
const crypto = require('crypto');




module.exports.user = function(req,res){
    res.end('in user controller');
}

module.exports.sign_in = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    
    res.render('signin',{
        title:"signin|site name"
    })
};

module.exports.sign_up = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    res.render('signup',{
        title :"signup | site name"
    })
}

module.exports.profile = function(req,res){
    res.render('profile',{
        title:"profile | site name"
    })
}

module.exports.create_user = function(req,res){
    //if password and confirm password doesnot match
    if(req.body.password != req.body.confirm_password){
        console.log(`password and confirm password does not match`)
        return res.redirect("back");
    }
    //if matches then
    else{
        //check if user already exists or not 
        User.findOne({email:req.body.email},function(err,user){
            if(err){
                console.log(`error in finding user from database : ${err}`);
                return res.redirect('back');
            }
            if(user){
                console.log(`user already exist with same email address`);
                return res.redirect('back')
            }
            //if no user is present with this email
            //create new user
            if(!user){
                User.create({
                    email:req.body.email,
                    password:req.body.password,
                    name : req.body.name,
                    number : req.body.number
                });
                return res.redirect('/user/sign-in');
            }
        })
    } 
}

module.exports.create_session = function(req,res){
//todo
    return res.redirect('/');
}

module.exports.log_out = function(req,res){
    req.logout();
    return res.redirect('back');
    
}

module.exports.edit_user = async function(req,res){
    try {
        let user = await User.findByIdAndUpdate(req.user.id,{
            email: req.body.email ,
            name : req.body.name ,
            number:req.body.number
            

        });
    console.log(user);

        mailer.forgot_password(user);

    return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.forgot_password = async function(req,res){

    try {
        console.log(req.query.email);
        let key = crypto.randomBytes(20).toString('hex')
        let user = await User.findOne({email:req.body.email});


        mailer.forgot_password(user);
        //noty setup 

        

        return res.redirect('/user/sign-in');

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.forgot_password_reset_recive = async function(req,res){
    try {
        console.log(`entered in forgot pass reset recive`)
        let user = await User.findById(req.query.userid);
        console.log(`auth key link ${req.query.authkey} auth key real ${user.auth_key} `)
        console.log(`user key link ${req.query.userid} user key real ${user.auth_key} `)

        if(user && user.auth_key == req.query.authkey){
            //change auth key and send to password redirect page
            return res.render('password_reset_forgot',{
                user:user.id,
                auth_key:user.auth_key

            })
        }else{
            //noty needed
            console.log('user not exist or authkey expired');
            res.redirect('back');
        }


    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.reset_pass_req = async function(req,res){
    try {
        //reset the password and update the auth key
        console.log(req.body);
        //check user id and auth key
        if(req.body.password == req.body['cn-password']){
            
            if(req.body['user-id'] && req.body['auth_key']){
                let user = await User.findById(req.body['user-id']);
                
                if( user && user.auth_key == req.body['auth_key'] ){
                    await User.findByIdAndUpdate(req.body['user-id'],{
                        password : req.body['password'],
                        auth_key:crypto.randomBytes(20).toString('hex')
                    });
                    console.log('password updated');
                }else{
                    console.log(`unautharised request`);
                    return res.redirect('back');  
                }
            }else{
                console.log(`unautharised request`);
                return res.redirect('back');

            }
        }else{
            console.log(`password and confirm password did not match`);
            return res.redirect('back');
        }


        return res.redirect('/user/sign-in')

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.forget_pass_page = function(req,res){
    return res.render('forgot_pass');
}