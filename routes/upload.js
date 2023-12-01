const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/UploadController");
const {
  uploadImageCloud,
  uploadImageLocal,
} = require("../middlewares/uploadImage");
router.post(
  "/single",
  uploadImageCloud.single("image"),
  uploadController.uploadSingleImage
);
module.exports = router;
