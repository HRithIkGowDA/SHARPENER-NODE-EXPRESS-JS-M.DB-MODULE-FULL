const express = require('express')
const path = require('path')
const rootDir = require('../utils/path')


const router = express.Router();

router.get('/',(req , res , next)=>{
    console.log("In the next Middleware")
    res.sendFile(path.join(rootDir  , 'views' , 'shop.html'))
  // res.send('<h1>Hello world from Main Page</h1>')
  // next()
})

module.exports = router