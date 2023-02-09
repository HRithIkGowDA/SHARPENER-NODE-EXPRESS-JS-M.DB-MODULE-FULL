const express = require('express');
const router = express.Router();
const path = require('path');
const purchaseController = require('../controllers/purchaseController');
const login_authenticate = require('../Middleware/authorization')

router.get('/purchase/premium',login_authenticate.authenticate,purchaseController.purchasepremium);
router.post('/purchase/updatestatus',login_authenticate.authenticate,purchaseController.updatepurchase);

module.exports=router;
