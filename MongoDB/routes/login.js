const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/loginController');
router.post('/login/sign-in',productsController.signin);
router.post('/login',productsController.login);



module.exports=router;