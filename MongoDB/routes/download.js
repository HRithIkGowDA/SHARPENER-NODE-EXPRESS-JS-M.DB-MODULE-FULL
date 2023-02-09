

const downloadController = require('../controllers/downloadController')
const login_authenticate = require('../Middleware/authorization')

const express = require('express');
const router = express.Router();
router.get('/expense/download',login_authenticate.authenticate,downloadController.downloadget);

module.exports=router;