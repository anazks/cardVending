const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB_USERNAME = process.env.DB_USERNAME;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_NAME = process.env.DB_NAME;
    let url = `mongodb+srv://user:123@cluster0.kop4wrn.mongodb.net/cardVending?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose.set("strictQuery", false);
    await mongoose.connect(url);
    console.log("Connected Database Successfully");
  } catch (error) {
    console.log("------------------")
    console.log(error);
  }
};

module.exports = connectDB;
