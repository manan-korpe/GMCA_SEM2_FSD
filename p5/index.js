const http = require("http");
const fs = require("fs").promises;
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    fs.readFile("feedback.html")
      .then(data => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      })
      .catch(() => {
        res.writeHead(500);
        res.end("Error loading page");
      });
  }
  else if (req.method === "POST" && req.url === "/submit") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const parsed = querystring.parse(body);
        const entry = `Name: ${parsed.name}, Feedback: ${parsed.message}\n`;
        await fs.appendFile("feedback.txt", entry);
        const fileData = await fs.readFile("feedback.txt", "utf-8");
        console.log("Updated Feedback File:\n", fileData);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
          <h2>Thank you for feedback!</h2>
          <pre>${fileData}</pre>
          <a href="/">Go Back</a>
        `);
      } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end("Server Error");
      }
    });
  }
  else {
    res.writeHead(404);
    res.end("Page Not Found");
  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});