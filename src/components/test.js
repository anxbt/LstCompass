const express = require("express");
const app = express();
const PORT = 3000;

// Store request logs
const requestLog = {};

const middleware = (req, res, next) => {
  requestLog.userIP = req.ip;
 requestLog.count=0;
Const date=date.now()


  if (req.userIp == userIP) {
    requestLog.count += 1;
   
  }

  if (requestLog.count > 10) {
    return res.status(429).send("Too many requests. Slow down!");
  }

  setTimeout(() => {
    requestLog.count = 0;
  }, 3000);

  // If the request is within 20ms, increment count (seems redundant)
  if (Date.now() < 20) {
    requestLog.count += 1;
  }

  next();
};

// Apply middleware to all routes
app.use(middleware);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});