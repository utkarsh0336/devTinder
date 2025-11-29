const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");


profileRouter.get("/profile", userAuth, async (req, res) => {
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

module.exports = profileRouter;