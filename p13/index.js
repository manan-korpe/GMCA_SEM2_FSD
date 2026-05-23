const express = require('express');
const session = require('express-session');

const app = express();

let totalVisitors = 0;
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true
  })
);

app.get('/', (req, res) => {

  if (!req.session.visited) {
    req.session.visited = true;
    totalVisitors++;
  }

  if (!req.session.pageViews) {
    req.session.pageViews = 1;
  } else {
    req.session.pageViews++;
  }

  res.send(`
    <h1>Visitor Counter Application</h1>
    <h2>Total Unique Visitors: ${totalVisitors}</h2>
    <h2>Your Visit Count: ${req.session.pageViews}</h2>
    <p>Refresh page to increase your visit count.</p>
  `);
});

// Server
app.listen(3000,console.log('http://localhost:3000'));