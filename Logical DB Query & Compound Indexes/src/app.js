const express = require("express");
const connectDB = require("./config/database.js");
const app = express(); // instance of express js application
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



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
