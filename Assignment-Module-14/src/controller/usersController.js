const userModels =require('../model/usersModel')
const jwt=require('jsonwebtoken')
const SendEmailUtility = require("../utility/SendEmailUtility");
const otpModel = require("../model/otpModel");

exports.registration=async (req,res)=>{
    try {
        let reqBody=req.body;

        let data=await userModels.create(reqBody);

        res.json({status:"success",message:data})
    }
    catch (error){
        res.json({status:"Fail",message:error})
    }
}

exports.login=async (req,res)=>{
    try {
        let reqBody=req.body;

        let user=await userModels.find(reqBody);
        if(user.length>0){
            let payloead={exp:Math.floor(Date.now()/1000)+(24*60*60),data:reqBody['email']};
            let token=jwt.sign(payloead,process.env.JWT_SECRET_KEY)
            res.json({status:"success",message:"User Found",token:token})
        }
        else {
            res.json({status:"fail",message:"not user found"})
        }
        res.json({status:"success",message:user})
    }
    catch (error){
        res.json({status:"Fail",message:error})
    }
}
exports.profileDetails=async (req,res)=>{
    try {
        let email= req.headers['email'];

        let rueslt=await userModels.find({email:email})
        res.json({status:"success",data:rueslt})

    }catch (error) {
        res.json({status: "Fail", message: error})
    }

}

exports.profileUpdate= async (req,res)=>{

    try {
        let email= req.headers['email'];
        let reqBody=req.body;

        await userModels.updateOne({email:email},reqBody)
        res.json({status:"success",message:"Profile Update Completed"})

    }catch (error) {
        res.json({status: "Fail", message: error})
    }

}



exports.verifyEmail=async (req,res)=>{
    try {
        const {email}=req.params
        let user=await userModels.find({email:email})
        if (user.length>0){
            //sendEmail
            let otp= Math.floor(100000+Math.random()*900000)
            await SendEmailUtility(email,`Your PIN=${otp}`,"Assinment")

            await otpModel.create({email:email,otp:otp,status:"Active"})
            res.json({status:"success",message:"Verifection code has been sent to your email"})
        }
        else {
            res.json({status:"fail",message:"Not User Found"})
        }
    }catch (error){
        res.json({status: "Fail", message: error})
    }

}
exports.verifyOtp=async (req,res)=>{
    try {
        const {email,otp}=req.params
        let user=await otpModel.find({email:email,otp:otp,status:"Active"})
        if (user.length>0){

            await otpModel.updateOne({email:email,otp:otp},{status:"verifed"})
            res.json({status:"success",message:"Code Verifection success"})
        }
        else {
            res.json({status:"fail",message:"Not User Found"})
        }
    }catch (error){
        res.json({status: "Fail", message: error})
    }

}
exports.passwordReset=async (req,res)=>{
    try {
        const {email,otp,Password}=req.params;
        let user=await otpModel.find({email:email,otp:otp,status:"verifed"})
        if (user.length>0){

            await otpModel.deleteOne({email:email,otp:otp})
            await userModels.updateOne({email:email},{Password:Password})
            res.json({status:"success",message:"PassWord Reset success"})
        }
        else {
            res.json({status:"fail",message:"Not Found"})
        }
    }catch (error){
        res.json({status: "Fail", message: error})
    }
}




