const express = require("express");
const connectDB = require("./config/database.js");
const app = express(); // instance of express js application
const User = require("./models/user.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = req.body;
  // Creating a new instance of the User model
  const user = new User(userObj);
  try {
    await user.save(); //  this function returns a promise
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});

// GET user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User Not Found !!!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong !!!");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong !!!");
  }
});

// Delete a user from the DB
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong !!!");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "skills",
      "photoUrl",
      "about",
      "gender",
      "age",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed !!!");
    }

    if(data?.skills.length > 10){
      return new Error("Skills can't be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("User Updated Successfully");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Something went wrong !!!");
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
