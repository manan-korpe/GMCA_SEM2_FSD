const express = require("express");
const bodyParser = require("Body-parser");
const mongoose = require("mongoose");

const app = express();
const dbname = "GMCA";

async function connectDB(){
    try{
        await mongoose.connect(`mongodb://localhost:27017/${dbname}`);
        console.log(`Database ${dbname} Successfuly connected.`);
    }catch(error){
        console.log("error to connect Database : "+ error.message);
    }
}

connectDB();

const blogSchema = new mongoose.Schema({
    author:String,
    title:String,
    blog:String
});

const Blogs = mongoose.model("blogs", blogSchema);

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extends:true}));

app.get("/",async(req,res)=>{
    res.render("postBlog",{message:""});
});

app.post("/",async(req,res)=>{
    const data = req.body;

    const newblog = Blogs(data);
    await newblog.save();

    res.render("postBlog",{message:"Blog Submitted Successfuly"});;
});

app.get("/blogs",async(req,res)=>{
    try{
        const blogs = await Blogs.find({}) || [];
        console.log(blogs);
        res.render("posts",{blogs});
    }catch(error){
        console.log(error.message);
        res.send("<h1>Error TO Load File</h1>")
    }
});

app.listen(3000,console.log("http://localhost:3000"));