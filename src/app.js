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

app.get("/hello",(req,res) => {  // This is known as Request Handler
    res.send("Hello Hello Hello !");
});

app.get("/test",(req,res) => {  // This is known as Request Handler
    res.send("Hello from the server !");
});

app.get("/user",(req,res) => {  // This is known as Request Handler
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
});   // a web server is created on port 3000 and this app is listening on this server.
