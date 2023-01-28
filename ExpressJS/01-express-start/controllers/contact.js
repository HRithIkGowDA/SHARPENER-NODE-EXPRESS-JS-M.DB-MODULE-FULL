const path = require('path')
const rootDir = require('../utils/path')

exports.formPage = (req , res , next)=>{
    res.sendFile(path.join(rootDir  , 'views' , 'contact.html'))

  //  res.send('<form action="/admin/products" method="POST"><input type="text" name="title" /><input type="number" name="quantity" /><button type="submit">Add </button></form>')
  }

exports.formControl = (req , res , next)=>{
    console.log(req.body)
   // res.redirect('/')
   res.send('<h1>Success</h1>')
   // next();
}

