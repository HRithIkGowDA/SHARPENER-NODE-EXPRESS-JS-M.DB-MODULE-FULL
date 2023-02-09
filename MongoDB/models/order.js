const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema( {

    paymentid:{
        type: String,
        
    },
    orderid:{
        type: String,
        required : true 
    },
    status:String,
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
       
    }
});

module.exports = mongoose.model('order',orderSchema);
