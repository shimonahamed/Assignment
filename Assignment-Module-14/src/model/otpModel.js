const mongoose=require('mongoose');

const DBSchema = mongoose.Schema({
    email:{type:String,require:true},
    otp:{type:String,require:true},
    status:{type:String,require:true},
},{versionKey:false})

const otpModel=mongoose.model('otps',DBSchema);

module.exports=otpModel;