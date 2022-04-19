const express = require('express');
const routes = express.Router();
const passport = require('passport');
const profile_controller = require('../controllers/profile-controller');

routes.get('/',profile_controller.profile);
routes.get('/wishlist',profile_controller.wishlist);
routes.post('/add-to-wishlist',passport.checkAuthentication ,profile_controller.addtowishlist);








module.exports = routes;


