//basic Library Import
const express = require('express');
const router=require("./src/router/api");
const app=new express();
const ratelimit=require('express-rate-limit');
const helmet=require('helmet');
const hpp= require('hpp');
const cors=require('cors');
// const url = require("url");
const mongoose = require("mongoose");

//cors open

app.use(cors());

//security Impelementation
app.use(helmet());
app.use(hpp());
app.use(express.json({limit:'20mb'}));
app.use(express.urlencoded({extended:true}));
const limit=ratelimit({windowMs:15*60*1000,max:3000});
app.use(limit)

//DB Connect
let URL="mongodb://localhost:27017/userDb"
OPTION={user:"",pass:"",autoIndex:true}
mongoose.connect(URL,OPTION,(error)=>{
    console.log("Connect Success")
    console.log(error)
})

//Route Implement

app.use("/api",router);

//404 not fuond Implement
app.use("*",(req,res)=>{
    res.status(404).json({data:"Not Found"})
})
module.exports=app;

