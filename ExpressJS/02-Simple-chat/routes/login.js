const express = require('express')
const router = express.Router();

router.use('/login' , (req , res ,next)=>{
    console.log("In login")
    const submitHandler=(event)=>{
        event.preventDefault();
        localStorage.setItem(`username`,document.getElementById(`username`).value)
        console.log("Hrithik")
    }
    res.send('<form onSubmit="localStorage.setItem(`username`,document.getElementById(`username`).value) "  action="/add-message" method="POST"><input id="username" type="text" name="username" /><button type="submit">Add </button></form>')
})

// router.use('/setlocalstorage', (res , req , next)=>{
//     console.log(req.body)
//      console.log("Setting loal storage")
//      res.redirect('/')
// })

module.exports = router 