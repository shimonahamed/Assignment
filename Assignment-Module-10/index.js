var fs=require('fs')
var http = require('http')
var multer=require('multer')
const url = require("url");

var storage=multer.diskStorage({
    destination:function (req,file,callback){
        callback(null,'./upload')
    },
    filename:function (req,file,callback){
        callback(null,file.originalname)
    }
});
var upload=multer({storage:storage}).single('myfile')

let server = http.createServer(function (req,res) {
    if (req.url == "/") {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write("This is Home Page")
        res.end();

    } else if (req.url == "/contact") {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write("This is Contact Page")
        res.end();
    } else if (req.url == "/services") {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write("This is Services Page")
        res.end();
    }else if(req.url=='/file-write'){
        fs.writeFile("index.html", "Hello Word", function (error) {
            if (error){
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write("File Write Fail")
                res.end();
            }else{
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write("File Write Success")
                res.end();
            }
        })
    }else if(req.method==='POST' && req.url==='/upload'){
        upload(req,res,function (error){
            if (error){
                console.error('File Upload Fail',error.message)
                return res.end('File Upload Fail')
            }
            else {
                res.end('File Upload Success')
            }
        })

    }
})
server.listen(5500,function(){
    console.log("Server Run Success");
})


