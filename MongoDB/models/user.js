const mongoose = require('mongoose');
 const Schema = mongoose.Schema
const userSchema = new Schema( {
    fname:{
        type: String,
        required : true 
    },
    lname:{
        type: String,
        required : true  
    },

    username: 
    { type: String,
        required : true 

    },
    password:
    {
        type: String,
        required : true 
        
    },
    ispremiumuser:Boolean
});

module.exports = mongoose.model('User',userSchema);
