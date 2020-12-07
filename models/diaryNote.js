const mongoose = require('mongoose');
const diaryNoteSchema = new mongoose.Schema({
    content: String,
    date: {
        type: Date,
        default: Date.now()
    }
});
const DiaryNote = mongoose.model("diaryNote", diaryNoteSchema);
module.exports.DiaryNote = DiaryNote;
module.exports.diaryNoteSchema = diaryNoteSchema;