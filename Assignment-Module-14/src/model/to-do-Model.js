const mongoose=require('mongoose');

const DBSchema = mongoose.Schema({
    email:{type:String,require:true},
    FristName:{type:String,require:true},
    LastName:{type:String,require:true},
    PhoneNumber:{type:String,require:true},
    City:{type:String,require:true},
    description:{type:String,require:true},
    status:{type:String,require:true},
},{timestamps:true,versionKey:false})

const tasksModel=mongoose.model('to-do-lists',DBSchema);

module.exports=tasksModel;