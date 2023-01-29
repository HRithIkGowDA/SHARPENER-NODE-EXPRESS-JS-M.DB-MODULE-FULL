const express=require('express')
const router=express.Router()
const User=require('../models/User')

const userController=require('../controllers/user')
router.post('/add-user',userController.adduser)
router.get('/get-users',async(req,res,next)=>{
    try{
    const users=await User.findAll();
    res.status(200).json(users)
    }catch(error){
        console.log('Get user is falling',JSON.stringify(error))
        res.status(500).json({error:error})
    }
  }
)
router.delete('/delete-user/:id',async(req,res,next)=>{
    try{
        if(!req.params.id){
            console.log('id is missing')
            res.status(400).json({err:'id is missing'})
        }
    const uId = req.params.id;
    await User.destroy({where:{id:uId}})
    }catch(err){
        console.log(err);
        res.status(500).json(err)

    }
  })
module.exports=router