const express = require("express");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/auto-login", authController.protect, authController.autoLogin);

module.exports = router;
