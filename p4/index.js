const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url);

    if (req.url === "/") {
        filePath = path.join(__dirname, "index.html");
    } else if (req.url === "/about") {
        filePath = path.join(__dirname, "about.html");
    } else if (req.url === "/contact") {
        filePath = path.join(__dirname, "contact.html");
    }

    const ext = path.extname(filePath);

    let contentType = "text/html";
    if (ext === ".css") {
        contentType = "text/css";
    } else if (ext === ".js") {
        contentType = "text/javascript";
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("404 Page Not Found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content);
        }
    });
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});