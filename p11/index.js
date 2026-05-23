const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

function createDB() {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "GMCA"
    });

    con.connect((err) => {
        if (err) {
            console.log("Database connection Failed: " + err.message);
        } else {
            console.log("Database Connected");
        }
    });

    return con;
}
const db = createDB();

app.get("/",async(req, res)=>{
    res.render("login");
})

app.get("/admin",async(req,res)=>{
    const user = req.cookies.user;
    
    if(!user) return res.redirect("/");

    console.log(user);

    res.send(`<h3>User : ${user.email}</h3>`);
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.redirect("/");
        }
        db.query(
            'SELECT user_id FROM users WHERE email = ? AND password = ?',
            [email, password],
            (err, result) => {

                if (err) {
                    return res.redirect("/");
                }
                if (result.length === 0) {
                    return res.redirect("/");
                }
                res.cookie("user",{user_id:result[0].user_id, email, password},{
                    maxAge:1000*60*60*48,
                    httpOnly:true,
                    secure:true,
                });

                res.redirect("/admin");
            }
        );
    } catch (err) {
        res.redirect("/");
    }
});

app.listen(3000,console.log("http://localhost:3000"));
