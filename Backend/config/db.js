const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/FormData", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DataBase Connected Successfully");
  } catch (error) {
    console.error("DB Connection error ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
