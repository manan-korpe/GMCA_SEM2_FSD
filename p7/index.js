const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/submit", (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    category: req.body.category
  };

  res.render("result", { book });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});