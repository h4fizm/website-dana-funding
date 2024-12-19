const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.get("/donations", AdminController.dashboard);
// router.get("/feedback");
// router.get("/users");
// router.get("/profile");

module.exports = router;
