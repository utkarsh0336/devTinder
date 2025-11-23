const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      reqiured: true,
      unique: true,
      lowercase: true, // if you pass some uppercase letter in email , it will get converted into lowercase automatically
      trim: true, // trim the sapces
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid Email Address");
        }
      }
    },
    password: {
      type: String,
      reqiured: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Invalid Email Address");
        }
      }
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        // this validate will only work when we create a new object , or we will have to enable it to run on updates
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      validate(value){
        if(!validator.isURL(value)){
            throw new Error("Invalid Email Address");
        }
      }
    },
    about: {
      type: String,
      default: "This is a default about of the user !",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
// mongoose.model(name of the model, schema of the model)

module.exports = User;
