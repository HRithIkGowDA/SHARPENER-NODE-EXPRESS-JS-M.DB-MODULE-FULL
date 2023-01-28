// const express = require('express')
// const router = express.Router();

// router.use('/',(req , res , next)=>{
//     res.send('<form action="/addMessage" method="POST"><input type="text" name="message" /><button type="submit">Add </button></form>')
//   console.log("In message")
// })

// router.post('/addMessage' , (req , res , next)=>{
//   console.log(req.body)
//   console.log("In the addmessage")
//   res.send()
//   res.redirect('/')
// })

// module.exports = router

const express = require('express')

const router = express.Router();
const fs = require('fs')
const message = require('../app')

router.use('/add-message',(req , res , next)=>{
    console.log("In add message")
    fs.readFile('username.txt' , (err , data)=>{
      if(err) {
        console.log("err")
        data = "No chat Found"
      };
      res.send(`${data}<form onSubmit="document.getElementById('username').value=localStorage.getItem('username') " action="/message" method="POST"><input type="text" name="message" /><input type="hidden" name="username" id="username" /><button type="submit">Add </button></form>`)

     })
  })
  
  router.post('/message',(req , res , next)=>{
    console.log(`${req.body.username} : ${req.body.message}`)

    //  console.log(`${localStorage.getItem('username')}:${req.body.message}`)
      //console.log("In the message")
      fs.writeFile('username.txt' , `${req.body.username} : ${req.body.message } + \r\n` , {flag : 'a'} , (err)=>err ? console.log(err): res.redirect('/add-message'))
     // fs.writeFileSync('username.txt' , `${req.body.username} : ${req.body.message}`)
      //res.redirect('/add-message')
    //  res.send('<h1>Product Page</h1>')
     // next();
  })


module.exports = router