const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const SECRET_KEY = process.env.JWT_SECRET; // Replace with a secure secret key

// Controller to add a new user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  
  try {
    const users = await User.find();
    
  //   console.log('getAllUsers');
  //   console.log(users);
  // return false;
 
    res.status(200).json( {   status: true, data:users });
  } catch (error) {
    res.status(500).json({   status: false, data:error.message });
  }
};

// Controller to get LOGIN OF  a user by email and password
exports.logincheck = async (req, res) => {
  const {  email, password } = req.body;
  try {
    const user = await User.findOne({ email });
   
    if (!user) {
      return res.status(400).json({ status: false, error: "Invalid email or password!" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({  status: false, error: "Invalid email or password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ status: true, message: "Login successful!", token: token , user: user });
  } catch (error) {
    res.status(400).json({  status: false, message: error.message });
  }
};
// Controller to get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
