const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./db/User");
require("./db/config");
const app = express();

app.use(cors());

app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.listen(5000);
