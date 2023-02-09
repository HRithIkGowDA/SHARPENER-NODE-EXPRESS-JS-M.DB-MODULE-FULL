const express = require('express');
const router = express.Router();
const path = require('path');
const premiumController = require('../controllers/premiumController');
const login_authenticate = require('../Middleware/authorization');

router.get('/premium/Leaderboard',login_authenticate.authenticate,premiumController.userLeaderboard);
//router.get('/premium/download',login_authenticate.authenticate,premiumController.download);

module.exports=router;

