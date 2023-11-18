const Product = require("../models/ProductModel");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class MeController {
  // get me/store/products
  async storeProduct(req, res, next) {
    try {
      Product.find({}).then((products) =>
        res.render("me/stored-products", {
          products: mutipleMongooseToObject(products),
        })
      );
    } catch {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
}

module.exports = new MeController();
