const express = require("express");

const app = express();   // instance of express js application

// Handling a request
app.get("/",(req,res) => {  // This is known as Request Handler
    res.send("Hello from the Home !");
});

app.get("/hello",(req,res) => {  // This is known as Request Handler
    res.send("Hello Hello Hello !");
});

app.get("/test",(req,res) => {  // This is known as Request Handler
    res.send("Hello from the server !");
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...")
});   // a web server is created on port 3000 and this app is listening on this server.
