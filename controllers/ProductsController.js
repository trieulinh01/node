const Product = require("../models/ProductModel");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class ProductsController {
  // [GET] /products
  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      // res.json(products);
      res.render("products/list", {
        products: mutipleMongooseToObject(products),
      });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }

  // [GET] /products/slug
  async getProductDetail(req, res) {
    try {
      const product = await Product.findOne({ slug: req.params.slug });
      // res.json(product);
      res.render("products/detail", {
        product: mongooseToObject(product),
      });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
  // get home page
  async getAllProductsHome(req, res) {
    try {
      const products = await Product.find();
      // res.json(products);
      res.render("home", {
        products: mutipleMongooseToObject(products),
      });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
  // get
  createProduct(req, res) {
    res.render("products/create");
  }
  // Post products/store
  store(req, res) {
    res.json(req.body);
  }

  // get /products/:id/edit
  async edit(req, res) {
    const products = await Product.findById(req.params.id);
    res.render("products/edit", {
      products: mongooseToObject(products),
    });
  }
  //{PUT} /products/:id
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body).then(() =>
      // res.json(req.body)
      res.redirect("me/store/products")
    );
  }

  //DELETE /products/:id
  async deleteProduct(req, res, next) {
    try {
      Product.deleteOne({ _id: req.params.id }).then(() =>
        res.redirect("back")
      );
      // res.json(products);
      res.status(200).json({ message: "ok" });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
}

module.exports = new ProductsController();
