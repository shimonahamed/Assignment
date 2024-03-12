const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let token=req.headers['token']
        jwt.verify(token,process.env.JWT_SECRET_KEY,function (error,success){
            if (error){
                res.status(401).json({status:"Unathorized"})
            }else {
                let email=success['data']
                req.headers.email= email;
                next();
            }
        })
}