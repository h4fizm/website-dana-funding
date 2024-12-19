const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.get("/dashboard", AdminController.donations);
router.get("/feedback", AdminController.feedback);
router.get("/users");
router.get("/profile");

module.exports = router;
