const { findOneAndUpdate } = require("../models/user");

module.exports = function(err, req, res, next) {
    res.status(500).send("Something went wrong");
    next();
}