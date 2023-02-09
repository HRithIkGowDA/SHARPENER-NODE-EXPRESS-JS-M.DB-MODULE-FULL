const mongoose = require('mongoose');
 const Schema = mongoose.Schema
const expenseSchema = new Schema( {
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required : true 
    },
    amount: 
    {type: Number,
        required : true 

    },
    description: {
        type: String,
        required : true 
    
    },
    category:{
        type: String,
        required : true 
    }
});

// expenseSchema.methods.displayexpense =function (){

// }
module.exports = mongoose.model('Expense',expenseSchema);