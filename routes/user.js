const express = require('express')
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).send("already registered");
    }

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        diaryNotes: []
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    let token = jwt.sign({_id: user._id}, 'jwtPrivateKey123')
    return res.header('x-auth-token', token).status(200).send(user);
});

router.post("/auth", async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send("invalid email or password");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send("invalid email or password");
    }
    let token = jwt.sign({_id: user._id}, 'jwtPrivateKey123')
    res.send(token);
});


module.exports = router;
