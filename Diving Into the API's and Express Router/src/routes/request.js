const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("Sending connection request");

  res.send(user.firstName + " is sending Connection Request");
});

module.exports = requestRouter;