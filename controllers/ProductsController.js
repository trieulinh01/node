const Product = require("../models/ProductModel");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");
const productValidators = require("../validations/products");

class ProductsController {
  // [GET] /products
  async getAllProducts(req, res) {
    try {
      const products = await Product.find().populate("category");
      res.json(products);
      // res.render("products/list", {
      //   products: mutipleMongooseToObject(products),
      // });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }

  // [GET] /products/slug
  async getProductDetail(req, res) {
    try {
      const product = await Product.findOne({ slug: req.params.slug }).populate(
        "category"
      );
      res.json(product);
      // res.render("products/detail", {
      //   product: mongooseToObject(product),
      // });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
  // get home page
  async getAllProductsHome(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
      // res.render("home", {
      //   products: mutipleMongooseToObject(products),
      // });
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
    try {
      //validate product
      const { error } = productValidators.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ errors });
      }
      const product = new Product(...req.body);
      product.save();
      res.json({ mess: "thêm ok" });
      // res.redirect("/");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // get /products/:id/edit
  async edit(req, res) {
    const products = await Product.findById(req.params.id);
    res.render("products/edit", {
      products: mongooseToObject(products),
    });
  }
  //{PUT} /products/:id
  async update(req, res, next) {
    try {
      const product = await Product.updateOne({ _id: req.params.id }, req.body);
      res
        .status(200)
        .json({ message: "Update Product Successful", data: product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //DELETE /products/:id
  async deleteProduct(req, res, next) {
    try {
      // Product.deleteOne({ _id: req.params.id }).then(() =>
      //   res.redirect("back")
      // );
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Delete Product Successful" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductsController();
