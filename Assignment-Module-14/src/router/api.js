
const express = require('express');
const userController=require("../controller/usersController")
const todoController=require("../controller/to-do-Controller")
const Middleware=require('../middleware/authMiddleware')




const router=express.Router();

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/verifyEmail/:email',userController.verifyEmail)
router.get('/verifyOtp/:email/:otp',userController.verifyOtp)
router.get('/passwordReset/:email/:otp/:Password',userController.passwordReset)
//After Login
router.get('/profileDetails',Middleware,userController.profileDetails)
router.post('/profileUpdate',Middleware,userController.profileUpdate)

//task create ,read ,update, delete

router.post('/to-do-list/Create',Middleware,todoController.Create)
router.get('/to-do-list/Read',Middleware,todoController.Read)
router.post('/to-do-list/Update/:id',Middleware,todoController.Update)
router.get('/to-do-list/Delete/:id',Middleware,todoController.delete)







module.exports=router;