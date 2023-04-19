const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const moreDetails = require('../models/updateProfile')

// Register a new user
router.post('/register', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);
router.get("/:userId",  userController.getUser);
// Update user profile
router.post('/updateProfile', userController.updateUserDetails);
// router.get('/admin', userController.getAllUserDetails);

router.get("/admin", (req, res, next) => {
    moreDetails.find().then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });
  });
module.exports = router;
