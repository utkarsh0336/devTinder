const express = require("express");
const connectDB = require("./config/database.js");
const app = express(); // instance of express js application
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validation of the data
    validateSignUpData(req);

    // Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save(); //  this function returns a promise
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login", userAuth,async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    // console.log(user);
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // console.log(user.password);
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT(); // this generates a token and takes two parameters:- 1 is data and 2 is key which only server knows
      // console.log(token);

      // I will add the token to cookie and send the response back to the user.

      // We can also expire the cookie

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000)
      });

      res.send("User Login Successful !!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
    // res.send("Reading Cookie");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }

  // console.log(cookies);
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("Sending connection request");

  res.send(user.firstName + " is sending Connection Request");
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
