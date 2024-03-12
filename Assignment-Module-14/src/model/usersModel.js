const mongoose=require('mongoose');

const DBSchema = mongoose.Schema({
    email:{type:String,unique:true,require:true},
    FristName:{type:String,require:true},
    LastName:{type:String,require:true},
    Mobile:{type:Number,require:true},
    Password:{type:String,require:true},
},{versionKey:false})

const usersModel=mongoose.model('users',DBSchema);

module.exports=usersModel;