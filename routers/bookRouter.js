const express = require("express");
const authController = require("./../controllers/authController");
const bookController = require("./../controllers/bookController");

const router = express.Router();

router.post("/", authController.protect, bookController.createBook);
router.get("/", authController.protect, bookController.getBook);

router.patch(
  "/upload",
  authController.protect,
  bookController.uploadUserPhoto,
  bookController.resizeUserPhoto,
  bookController.updateImageToBook
);

module.exports = router;
