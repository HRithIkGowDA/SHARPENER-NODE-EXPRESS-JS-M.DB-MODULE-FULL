const Razorpay = require('razorpay');
const Order = require('../models/order')


exports.purchasepremium=(req,res,next)=>{
try{
   

    var rzp = new Razorpay({
        key_id : process.env.key_id,
        key_secret:process.env.key_secret
    })

      rzp.orders.create({ amount:30000,currency : 'INR',}, 
        (err, order)=>{
            console.log(order)

            let detail = new Order({orderid:order.id,status:'PENDING'})
    
       detail.save().then(()=>{
            return res.status(201).json({order,key_id:rzp.key_id});
        }).catch(err=>{
            throw new Error(err);
    })
    }) .catch(err=>{
        throw new Error(err);
})
}catch(err){
    console.log(err);
    res.status(403).json({message:'Something went wrong',error:err})
}
}

exports.updatepurchase= async (req,res)=>{
try{
    const {payment_id,order_id} = req.body;
     const filter = {orderid:order_id}
    const update ={paymentid:payment_id,status:'SUCCESSFUL'}
    const promise1  = await Order.findOneAndUpdate(filter, update);
    console.log(req.user.ispremiumuser)
    req.user.ispremiumuser = true;
    const promise2  = await req.user.save();
               
    Promise.all([promise1,promise2]).then(()=>{
        console.log("updated");
        return res.status(202).json({success:true,message:'Transaction Successful'});  
    }).catch(err=>{
                throw new Error(JSON.stringify(err));
        })
   
}


catch(err){
    console.log(err);
    res.status(403).json({message:'Something went wrong',error:err})


}
}

