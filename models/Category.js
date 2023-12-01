const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = new Schema({
  title: { type: String, maxLength: 255 },
  description: { type: String, maxLength: 600 },
  slug: { type: String },
});

module.exports = mongoose.model("Category", Category);
