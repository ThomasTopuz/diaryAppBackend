const mongoose = require('mongoose');
const {diaryNoteSchema} = require("./diaryNote");

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
const User = mongoose.model("User", userSchema);
module.exports = User;