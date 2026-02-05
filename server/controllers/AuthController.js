const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/User/UserSchema");

const HashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const AuthRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (email === "admin@gmail.com") {
      return res.status(403).json({ message: "Admin account is pre-defined. Cannot register." });
    }

    const existUser = await UserSchema.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email already used" });
    }

    const hashPassword = await HashPassword(password);

    const newUser = new UserSchema({
      name,
      email,
      password: hashPassword,
      role: "user",
    });

    await newUser.save();

    return res.status(201).json({
      message: "Registration successful",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const AuthLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role || "user",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      })
      .json({
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || "user",
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { AuthRegister, AuthLogin };
