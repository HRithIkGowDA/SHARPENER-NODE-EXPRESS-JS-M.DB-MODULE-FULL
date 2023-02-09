const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
 const Schema = mongoose.Schema
const forgotpasswordSchema = new Schema( {
    
    active: Boolean,
    expiresby: Date,
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required : true 
    }
})

module.exports = mongoose.model('password',forgotpasswordSchema);

