const adminAuth = (req,res,next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    console.log("Admin Auth is getting executed");

    if(!isAdminAuthorized){
        res.status(401).send("Admin is not authorized");
    }
    else{
        next();
    }
};

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;  // read user token from cookie
    if (!token) {
      return res.status(401).send("No token provided");
    }

    // verify the token
    const decoded = jwt.verify(token, "DEV@Tinder$790");

    // fetch user from DB
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).send("Invalid token");
    }

    req.user = user;  // attach user to request
    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    res.status(401).send("Authentication failed");
  }
};

module.exports = {
    adminAuth,
    userAuth
}