const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const MoreDetails = require("../models/updateProfile");
const dotenv = require("dotenv");
dotenv.config();
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, contact, password, agree, approve } =
    req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    contact,
    password: hashedPassword,
    agree,
    approve,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Check password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // set expiration time to 24 hours from now
  const expiresIn = (expirationDate.getTime() - now.getTime()) / 1000;
  res.status(200).json({ token, expiresIn });
};

exports.getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user details
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contact: user.contact,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUserDetails = async (req, res) => {
  console.log("upd work itll here");
  try {
    // Create a new instance of the MoreDetails model with the form data
    const moreDetails = new MoreDetails(req.body);
    // Save the form data to the database
    await moreDetails.save();

    // Return a success response
    res.status(200).json({ message: "Form data submitted successfully" });
  } catch (error) {
    console.error("updateUserDetails error", error);
    // Return an error response
    res.status(500).json({ message: "Error submitting form data", error });
  }
};

exports.getAllUserDetails = async (req, res) => {
  moreDetails.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
};

