require('dotenv').config()

const app=require('./app')
app.listen(5500,function (){
    console.log("Running...")
})
