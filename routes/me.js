const express = require("express");
const router = express.Router();
const meController = require("../controllers/meController");
router.get("/store/products", meController.storeProduct);
module.exports = router;
