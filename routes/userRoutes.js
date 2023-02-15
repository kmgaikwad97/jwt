const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');

// Public Routes
router.post('/register',UserController.userRegistration)
router.post('/login',UserController.userLogin)

// Protected Routes
router.post('/changepassword',UserController.changeUserPassword)


module.exports = router