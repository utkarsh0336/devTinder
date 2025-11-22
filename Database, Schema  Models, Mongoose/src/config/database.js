const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sahaycoder_db_user:hfuulEmXoVA0F6Ts@namastenode.7at8ayn.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

