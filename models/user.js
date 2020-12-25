const mongoose = require('mongoose');
const {diaryNoteSchema} = require("./diaryNote");
const config = require('config');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    diaryNotes: [diaryNoteSchema]
});

userSchema.methods.generateJwt = function () {
    let token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
    return token;
}
const User = mongoose.model("User", userSchema);
module.exports = User;