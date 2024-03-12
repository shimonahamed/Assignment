
const todoModel=require('../model/to-do-Model')

exports.Create=async (req,res)=>{
    try{
        let email=req.headers['email'];
        let reqBody=req.body;
        reqBody.email=email;
        await todoModel.create(reqBody);
        res.json({status:"success",message:"Create Completed"})

    }catch (err) {
        res.json({status:"fail",message:err})
    }
}
exports.Update=async (req,res)=>{
    try{
        let email=req.headers['email'];
        let {id}=req.params
        let reqBody=req.body;
        await todoModel.updateOne({_id:id,email:email},reqBody);
        res.json({status:"success",message:"Update Completed"})

    }catch (err) {
        res.json({status:"fail",message:err})
    }
}
exports.Read=async (req,res)=>{
    try{
        let email=req.headers['email'];

        let data=await todoModel.find({email:email});
        res.json({status:"success",data:data})

    }catch (err) {
        res.json({status:"fail",message:err})
    }
}

exports.delete=async (req,res)=>{
    try{
        let email=req.headers['email'];
        let {id}=req.params
        await todoModel.deleteOne({_id:id,email:email});
        res.json({status:"success",message:"Delete Completed"})

    }catch (err) {
        res.json({status:"fail",message:err})
    }
}

