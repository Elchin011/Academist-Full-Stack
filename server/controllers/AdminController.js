const bcrypt = require("bcrypt");
const User = require("../models/User/UserSchema");

const createAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";

    const existAdmin = await User.findOne({ email: adminEmail });
    if (existAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

module.exports = { createAdmin };
