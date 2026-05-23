const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.post("/",async(req, res)=>{
    try{
        const data = req.body;

        res.cookie("student",data,{
            maxAge:1000*60*60*48,
            httpOnly:true,
            secure:true
        });
        
        res.redirect("/");
    }catch(err){
        res.send("<h1>Error</h1>");
    }
});

app.get("/",async(req, res)=>{
    try{
        const student = req.cookies.student || "";
        console.log(student)
        res.render("form",{student});
    }catch(err){
        res.send("<h1>Error</h1>");
    }
});

app.post("/forget",async(req, res)=>{
    try{
        res.clearCookie("student");        
        res.redirect("/");
    }catch(err){
        res.send("<h1>Error</h1>");
    }
});

app.listen(3000,console.log("http://localhost:3000"));