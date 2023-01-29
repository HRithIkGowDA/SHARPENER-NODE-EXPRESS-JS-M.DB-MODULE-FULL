const express=require('express')
const router=express.Router()
const userController=require('../controllers/user')
const User=require('../models/User')
router.post('/user/add-user',userController.adduser)
router.get('/user/get-users',userController.getElement)
router.delete('/user/delete-user/:id',userController.getDelete)
module.exports=router
  