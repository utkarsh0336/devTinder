const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res, next) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

   res.json({
    message: `${loggedInUser.firstName + " " + loggedInUser.lastName + "'s Profile Updated Successfully"} `,
    data: loggedInUser
   });
    
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
