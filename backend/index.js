const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";
require("./db/config");
const app = express();

app.use(cors());

app.use(express.json());

app.post("/register", verifyToken, async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  Jwt.sign({ result }, jwtKey, (err, token) => {
    if (err) {
      res.send({ msg: "Something Went Wrong Pls Try After Some Time" });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", verifyToken, async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  if (password && email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, (err, token) => {
        if (err) {
          res.send({ msg: "Something Went Wrong Pls Try After Some Time" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "User Not Found" });
    }
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
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

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product Found" });
  }
});

app.delete("/delete-product/:id", verifyToken, async (req, res) => {
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

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findById({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ msg: "Something went wrong" });
  }
});

app.put("/product/:id", async (req, res) => {
  let result = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  if (result) {
    res.send(result);
  } else {
    res.send({ msg: "Something Went Wrong" });
  }
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, success) => {
      if (err) {
        res.status(401).send({ msg: "pls provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send("pls add Token with header");
  }
}

app.listen(5000);
