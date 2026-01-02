const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation.js");
const { userAuth } = require("../middlewares/auth.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const { validateEditProfileData } = require("../utils/validation.js");


authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of the data
    validateSignUpData(req);

    // Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    // console.log(firstName);
    // console.log(lastName);
    // console.log(emailId);
    // console.log(password);
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res
      .status(200)
      .json({ message: "User added successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  
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
      // console.log("This is my token ", token);

      // I will add the token to cookie and send the response back to the user.

      // We can also expire the cookie

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("User Login Successful !!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req,res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  })
  res.send("Logout Successfull");
});

module.exports = authRouter;