const express = require('express')
const path = require('path')
const rootDir = require('../utils/path')

const router = express.Router();

router.use('/add-product',(req , res , next)=>{
    console.log("In add products")
    res.sendFile(path.join(rootDir  , 'views' , 'add-product.html'))

  //  res.send('<form action="/admin/products" method="POST"><input type="text" name="title" /><input type="number" name="quantity" /><button type="submit">Add </button></form>')
  })
  
  router.post('/products',(req , res , next)=>{
      console.log(req.body)
      console.log("In the Products")
      res.redirect('/')
    //  res.send('<h1>Product Page</h1>')
     // next();
  })


module.exports = router