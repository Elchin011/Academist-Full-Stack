const mongoose = require("mongoose");

function ConnectDb() {
  const dbUrl = process.env.MONGO_URI;

  return mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });
}

module.exports = ConnectDb;
