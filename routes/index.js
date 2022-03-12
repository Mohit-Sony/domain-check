const express = require('express');

const routes = express.Router();
const homeController = require("../controllers/home-controller");


routes.get('/',homeController.home);

routes.use('/user', require('./user'));
routes.get('/result' , homeController.result );


routes.get('/profile',require('./profile') );
routes.get('/checkavail/:domain',homeController.check_avail);


module.exports = routes;

