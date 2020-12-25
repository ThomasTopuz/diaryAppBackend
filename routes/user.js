const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMid = require("../middleware/async");
const config = require('config');
const auth = require("../middleware/auth");
const _ = require('lodash');

router.post("/register", asyncMid(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("already registered");
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    diaryNotes: [],
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  let token = user.generateJwt();
  return res.header("x-auth-token", token).status(200).send(_.pick(user,['username','email']));
}));

router.post("/auth", asyncMid(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("invalid email or password");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("invalid email or password");
  }
  let token = user.generateJwt();
  res.header('x-auth-token',token).status(200).send(_.pick(user,['username','email']))
}));

router.get("/me",auth ,asyncMid(async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  return res.send(_.pick(user,['username','email']));
}));

module.exports = router;
