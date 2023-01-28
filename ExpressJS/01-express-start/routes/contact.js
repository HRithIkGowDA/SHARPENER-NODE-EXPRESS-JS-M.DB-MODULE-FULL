const express = require('express')
const path = require('path')
const rootDir = require('../utils/path')
const contactController = require('../controllers/contact')

const router = express.Router();

router.use('/contactus',contactController.formPage)
  
  router.post('/contact-form',contactController.formControl)


module.exports = router