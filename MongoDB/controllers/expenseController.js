const dotnev = require('dotenv').config();

const path = require('path');

const Expense = require("../models/expense");


exports.addExpense=async (req,res,next)=>{
    try {
      
      const amount = req.body.amount;
      const category = req.body.category;
      const description = req.body.description;
      
  
      if (!amount) {
          throw new Error('Amount is mandatory !')
      }
      const data = new Expense({
          amount : amount,
          category : category,
          description : description,
          userId:req.user._id
      })
      data.save()
      res.status(201).json({ newExpenseDetail: data });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}

exports.getExpense = async (req,res,next)=>{
try{
    
    Expense.find({userId:req.user._id}).then((expense)=>{
           
            res.status(200).json({expense:expense});
        })
       
} catch(err) {
    console.log(err);
    res.status(500).json({error : err})
}
}

exports.deleteExpense = async (req,res,next)=>{
    try{
        const id = req.params.id;
         
        const user = Expense.find({'_id':id,'userId':req.user._id});
        if(!user){
            console.log('This user does not exist.');
            return res.sendStatus(400);
        }
        await Expense.findByIdAndDelete( {'_id':id});
        res.sendStatus(200);
        }catch(err){
            console.log(err);
            res.status(500).json({error : err})
        }
}
exports.editExpense = async (req, res, next) => {
    try{
        
        const updatedamount = req.body.amount;
        console.log(updatedamount)
        const updateddescription = req.body.description;
        const updatedcategory = req.body.category;
        const id = req.params.id;
        console.log(id);

        let detail = await Expense.findById(id);
       detail.userId = req.user._id;
       detail.amount=updatedamount;
       detail.description=updateddescription;
       detail.category=updatedcategory
               
               detail.save();
                res.status(201).json({detail}); 
    }catch(err){
        console.log(err);
        res.status(500).json({error : err})
    }
}

