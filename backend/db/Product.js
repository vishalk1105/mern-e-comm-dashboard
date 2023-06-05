const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  category: {
    type: String,
  },
  userId: {
    type: String,
  },
  company: {
    type: String,
  },
});

module.exports = mongoose.model("products", ProductSchema);
