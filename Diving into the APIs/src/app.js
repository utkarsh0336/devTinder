const express = require("express");
const connectDB  = require("./config/database.js");
const app = express(); // instance of express js application
const User = require("./models/user.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
    const userObj = req.body;
    // Creating a new instance of the User model
    const user = new User(userObj);
    try{
        await user.save();   //  this function returns a promise
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user : " + err.message);
    }
});


connectDB()
  .then(() => {
    console.log("DB Connected...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.log("DB Not Connected !!!");
  });
