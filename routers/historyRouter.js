const express = require("express");
const authController = require("./../controllers/authController");
const historyController = require("./../controllers/historyController");

const router = express.Router();

router.post("/", authController.protect, historyController.createHistory);
router.put("/", authController.protect, historyController.updateHistory);
router.delete("/", authController.protect, historyController.deleteHistory);

module.exports = router;
