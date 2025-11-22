const express = require("express");

const app = express(); // instance of express js application

// app.use("route", [rH1, rH2 , rH3, rH4, rH5]); signature , we can send any combination of route handler inside an array

app.use(
  "/user",
  [(req, res, next) => {
    console.log("Handling the route user 1");
    // res.send("Request Handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    // res.send("Request Handler 2");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3");
    // res.send("Request Handler 3");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4");
    // res.send("Request Handler 4");
    // next();
  }]
);

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
}); // a web server is created on port 3000 and this app is listening on this server.
