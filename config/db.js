const { compareSync } = require("bcryptjs");
const mongoose = require("mongoose"); // to have a control in the database
const config = require("config");
const db = config.get("mongoURI"); // to get the url in default.json

//to connect in db
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected");
  } catch (e) {
    console.log(e.message);
    process.exit(1); //to process with failure
  }
};

module.exports = connectDB;
