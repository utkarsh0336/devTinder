# Express.js Application – Routing Example Day 1

```js
const express = require("express");

const app = express();   // instance of express js application

/**
 * When I use app.use() , the order of code matters it check for the exactly match in the order and prints the response immediately
 * app.use() match all the HTTP methods to the route passed.
 * So to avoid this we use app.get()
 * but app.get() only handle the GET call to the route passed
 */

// app.use("/", (req,res) => {
//     res.send("HAHAHAHA");
// });   This code will give HAHAHAHA always because the order matters and we are using use().

app.get("/",(req,res) => {  // This is known as Request Handler
    res.send("Hello from the Home !");
});

app.get(/\/ab?c$/, (req, res) => {
    // This route uses a RegExp: it will match `/ac` or `/abc`
    // this will work for the paths /abc , /ac because b is optional
    res.send({ firstName: "Utkarsh", lastName: "Sahay" });
});

app.get("/hello",(req,res) => {  // This is known as Request Handler
    res.send("Hello Hello Hello !");
});

app.get("/test",(req,res) => {  // This is known as Request Handler
    res.send("Hello from the server !");
});

app.get("/user",(req,res) => {
    console.log(req.query);   // You will get all the query in the console and the url you passed was /user?userId=101&password=testing
    res.send({firstName: "Utkarsh", lastName: "Sahay"});
});

app.get("/user/:userId/:name/:password",(req,res) => {  // It will match all the routes like /user/707/:name/:password  
    console.log(req.params);            // You will get all the parameters in the console and the url you passed was /user/707 , we can pass dynamic routes with as many parameters as we want
    res.send({firstName: "Utkarsh", lastName: "Sahay"});
});

app.post("/user",(req,res) => {  // This is known as Request Handler
    // saving data to db
    res.send("Data successfully saved to the database");
});

app.delete("/user",(req,res) => {  // This is known as Request Handler
    res.send("Deleted Successfully");
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...")
});
