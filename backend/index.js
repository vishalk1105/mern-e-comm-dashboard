const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./db/User");
const Product = require("./db/Product");
require("./db/config");
const app = express();

app.use(cors());

app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  if (password && email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "User Not Found" });
    }
  } else {
    res.send({ result: "User Not Found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

// app.get("/get-products", async (req, res) => {
//   const userId = req.body.userId;
//   const data = await Product.find({ userId });
//   if (data) {
//     res.status(200).send({ msg: "Data fetched ", data });
//   } else {
//     res.status(400).send({ msg: "Something went wrong" });
//   }
// });

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product Found" });
  }
});

app.delete("/delete-product/:id", async (req, res) => {
  try {
    const productId = await Product.findByIdAndDelete({ _id: req.params.id });
    if (productId.length > 0) {
      res.send(productId);
    } else {
      res.send({ msg: "No Products found" });
    }
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(5000);
