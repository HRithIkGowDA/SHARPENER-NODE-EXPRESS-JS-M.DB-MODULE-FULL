
const User=require('../models/User')
exports.adduser = async(req,res,next)=>{
  console.log('req.body',req.body)
  try{
   
  const expenseamount=req.body.expense;
  const description=req.body.desc;
  const category=req.body.cate;
  

  const data=await User.create({expenseamount:expenseamount,description:description,category:category})
  res.status(201).json(data)
  }
  catch(err){
    res.status(500).json({
      error:err
    })
  }
}