const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;
    console.log(token);  // it is giving undefined
    if (!token) {
      throw new Error("Token is not valid !!!");
    }

    // Validate the token
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedObj;
    // console.log("Temba id : ", _id);
    const user = await User.findById(_id);

    // Find the user
    if (!user) {
      throw new Error("User not found !!!");
    }
     
    req.user = user;
    next();

  } catch (err) {
    res.status(400).send("Something went wrong !!! " + err.message);
  }
};

module.exports = {
  userAuth
};
