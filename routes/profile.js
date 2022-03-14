const express = require('express');
const routes = express.Router();
const passport = require('passport');
const profile_controller = require('../controllers/profile-controller');

routes.get('/',profile_controller.profile);
routes.get('/wishlist',profile_controller.wishlist);








module.exports = routes;


