
const path = require('path');
const Expense = require('../models/expense')
//const AWS = require('aws-sdk')
//const Download = require('../models/download')
const User = require('../models/user');


exports.userLeaderboard = async (req,res,next)=>{
    try{
       let userDetails=[]
     let total = await  Expense.aggregate([
    
            { $group: {
                _id: '$userId',
                totalAmount: { $sum: "$amount" } }
              }
            
        ]).exec(async function ( e, d ) {
            await User.find().then(async user=>{
                for(let j =0;j<user.length;j++){
     
                 userDetails.push({fname:user[j].fname,lname:user[j].lname, TotalCost : d[j].totalAmount })
             }
             res.status(200).json(userDetails);
            })
        });
              
            }
          
              catch(err){
                  console.log(err);
                  res.status(500).json({message:'Something went wrong',error:err})
              
              
              }
        }

        
       
        
        
  
    
    
function uploadtoS3(data,filename){
    
    let s3bucket = new AWS.S3({
        accessKeyId : process.env.Access_key_ID,
        secretAccessKey : process.env.Secret_access_key
    })

    var params = {
        Bucket : prcess.env.Bucket,
        Key : filename,
        Body : data,
        ACL : 'public-read'
    }

    return new Promise((resolve,reject)=>{
      s3bucket.upload(params,(err,s3response)=>{
        if(err){
            console.log("Something went wrong",err)
            reject(err);
        }
        else
        {
            resolve(s3response.Location)
        }
      })
    })
}

exports.download = async (req,res)=>{
try{
    const expenses = await req.user.getExpenses();
    console.log(expenses);
    const stringifyExpenses = JSON.stringify(expenses);

    const userId = req.user.id;

    const filename = `Expenses${userId}/${new Date()}.txt`;
    const fileURL = await uploadtoS3(stringifyExpenses,filename);
    console.log(fileURL);
    let date = new Date();
    console.log(date);
    res.status(200).json({fileURL:fileURL,success:true});
    Download.create({
        userId:req.user.id,
        DateTime : date,
        fileUrl : fileURL
    })

}
catch(err){
    console.log(err);
    res.status(500).json({fileURL:'',success:false,err:err});
}
}