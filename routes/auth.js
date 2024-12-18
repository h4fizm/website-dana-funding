const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// Route login
router.post("/login", AuthController.login);

// Route register
router.post("/register", AuthController.register);

// Route logout
router.post("/logout", AuthController.logout);

module.exports = router;
