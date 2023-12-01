const products = require("./products");
const home = require("./home");
const meRouter = require("./me");
const users = require("./users");
const auth = require("./auth");
const upload = require("./upload");
const categories = require("./categories");
const { createProduct } = require("../controllers/ProductsController");
function routes(app) {
  app.use("/users", users);
  app.use("/categories", categories);
  app.use("/products", products);
  app.use("/", home);
  app.use("/me", meRouter);
  app.use("/create", createProduct);
  app.use("/auth", auth);
  app.use("/upload", upload);
}
module.exports = routes;
