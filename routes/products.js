const express = require("express");
const router = express.Router();

const productsController = require("../controllers/ProductsController");
const checkPermission = require("../middlewares/checkPermission");
router.get("/", productsController.getAllProducts);
router.get("/create", checkPermission, productsController.createProduct);
//router.post("/store", productsController.storeProduct);
router.post("/store", checkPermission, productsController.store);
router.get("/:id/edit", productsController.edit);
router.put("/:id", checkPermission, productsController.update);
router.delete("/:id", checkPermission, productsController.deleteProduct);
router.get("/:slug", productsController.getProductDetail);

module.exports = router;
