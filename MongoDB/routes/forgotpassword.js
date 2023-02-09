const express = require('express');

const resetpasswordController = require('../controllers/forgot_passwordController');
const login_authenticate = require('../Middleware/authorization')

const router = express.Router();

router.post('/password/forgotpassword',login_authenticate.authenticate, resetpasswordController.forgotpassword)
router.get('/password/updatepassword/:resetpasswordid', resetpasswordController.updatepassword)
router.get('/password/resetpassword/:id',resetpasswordController.resetpassword)

module.exports = router;