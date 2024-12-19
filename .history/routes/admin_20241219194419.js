const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.get("/dashboard", AdminController.donations);
router.get("/feedback", AdminController.feedback);
router.get("/users", AdminController.);
router.get("/profile", AdminController.feedback);
router.get("/useruefile");

module.exports = router;
