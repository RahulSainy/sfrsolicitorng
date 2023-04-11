const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Register a new user
router.post('/register', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);
router.get("/:userId",  userController.getUser);
// Update user profile
router.post('/updateProfile', userController.updateUserDetails);

module.exports = router;
