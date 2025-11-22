const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth.js");

const app = express(); // instance of express js application


// app.use("route", [rH1, rH2 , rH3, rH4, rH5]); signature , we can send any combination of route handler inside an array

// app.use(
//   "/user",
//   [(req, res, next) => {
//     console.log("Handling the route user 1");
//     // res.send("Request Handler 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 2");
//     // res.send("Request Handler 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 3");
//     // res.send("Request Handler 3");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 4");
//     // res.send("Request Handler 4");
//     // next();
//   }]
// );
/**
 * Why do we need multiple route handlers , can't we simply write everything in a single route handler ?
 * => Middlewares, thr route handlers are called as middlewares 
 */

// app.get("/user",(req,res,next) => {
//   console.log("Handling the route 1");
//   next();
// });   This works same as passing route handlers as arguments
// app.get("/user",(req,res) => {
//   console.log("Handling the route 2");
//   next;
// });

// Handle Auth Middleware of all request GET , POST
// app.use("/admin",adminAuth);

// app.use("/user",userAuth,(req,res) => {
//     res.send("User data sent");
// });

// app.get("/admin/getAllData", (req , res) => {
//     // check if the request is authorized or not
    
// });

// app.get("/admin/deleteUser", (req , res) => {
//     // check if the request is authorized or not
//     res.send("Deleted a user");
// });

app.get("/getUserData", (req , res) => {
    // Logic of DB call and get user data
    throw new Error("djhbdhb");
    res.send("User data sent");
});

app.use("/" , (err,req,res,next) => {
    if(err){
        // Log your errors
        


        res.status(500).send("Something went wrong !");
    }
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
}); // a web server is created on port 3000 and this app is listening on this server.
