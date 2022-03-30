const express = require('express');
const routes = express.Router();
const passport = require('passport');
const userController = require('../controllers/user-controller');


routes.get('/',function(req,res){
    res.end('in user');
});
routes.get('/sign-in',userController.sign_in);
routes.get('/sign-up',userController.sign_up);
routes.get('/sign-out',userController.user);
routes.post('/update-profile',userController.edit_user)
routes.use('/profile',passport.checkAuthentication ,require('./profile'));
// routes.get()
routes.post('/create-user',userController.create_user);

routes.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/sign-in'},
    ) ,userController.create_session)
;

routes.get('/log-out',userController.log_out);

routes.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
routes.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),userController.create_session);
routes.post('/forgot-pass',userController.forgot_password);
routes.get('/forgot',userController.forget_pass_page);
routes.get('/forgot-password/reset', userController.forgot_password_reset_recive);
routes.post('/forgot-password/new-password',userController.reset_pass_req);

module.exports = routes;

