const express = require('express');
const routes = express.Router();
const passport = require('passport');
const profile_controller = require('../controllers/profile-controller');

routes.get('/',profile_controller.profile);
routes.get('/wishlist',profile_controller.wishlist);
routes.post('/add-to-wishlist',passport.checkAuthentication ,profile_controller.addtowishlist);
routes.post('/remove-from-wishlist',passport.checkAuthentication ,profile_controller.removefromwishlist);
routes.post('/toggle-wishlist',passport.checkAuthentication ,profile_controller.toggletowishlist);








module.exports = routes;


