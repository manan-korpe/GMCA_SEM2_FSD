const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs").promises;

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",async(req, res)=>{
    try{
        let data = await fs.readFile("data.json","utf8");
        data = JSON.parse(data);
        res.render("index",data);
    }catch(error){
        console.log(error.message);
        res.send("<h1>Error TO Load File</h1>")
    }
});

app.post("/",async(req, res)=>{
    try{
        const bdata = req.body;
        let jdata = await fs.readFile("data.json","utf8");
        const {questions} = JSON.parse(jdata);
        let currect = 0;

        for(let key in bdata) if(questions[key-1].correctAnswer == bdata[key]) currect++;

        res.render("score",{currect,totalQuestions:5});
    }catch(error){
        console.log(error.message);
        res.send("<h1>Error TO Load File</h1>")
    }
});


app.listen(3000,console.log("http://localhost:3000"));
