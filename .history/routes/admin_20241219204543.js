const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.get("/donations", AdminController.donations);
router.get("/feedback", AdminController.feedback);
router.get("/users", AdminController.users);
router.get("/profile", AdminController.profile);
router.get("/add-user", AdminController.addUser);

module.exports = router;
