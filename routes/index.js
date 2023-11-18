const products = require("./products");
const home = require("./home");
const meRouter = require("./me");
const { createProduct } = require("../controllers/ProductsController");
function routes(app) {
  app.use("/products", products);
  app.use("/", home);
  app.use("/me", meRouter);
  app.use("/create", createProduct);
}
module.exports = routes;
