const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const TryCatch = require("../utils/TryCatch");

const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  generateToken(user._id, res);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  generateToken(user._id, res);

  res.status(200).json({
    message: "Successfully logged in",
    user,
  });
});

const logoutUser = TryCatch(async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({
    message: "Logged out successfully",
  });
});

module.exports = { registerUser, loginUser, logoutUser };
