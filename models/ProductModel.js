const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  productName: { type: String, maxLength: 255 },
  description: { type: String, maxLength: 600 },
  slug: { type: String, unique: true },
  image: { type: String, maxLength: 255 },
  price: { type: Number },
  sale_price: { type: Number },
  category: { type: Schema.Types.ObjectId, maxLength: 255,ref:"Category" }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", Product);
