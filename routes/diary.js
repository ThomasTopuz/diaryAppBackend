const express = require('express')
const router = express.Router();
const {DiaryNote} = require("../models/diaryNote");
const User = require("../models/user");
const auth = require('../middleware/auth');

//authentication middleware
router.use(auth);

router.get("/", (async (req, res) => {
    const user = await User.findById(req.user._id);
    const diaryNotes = user.diaryNotes;
    res.send(diaryNotes);
}));

router.post("/", (async (req, res) => {
    let diaryNote = new DiaryNote({
        content: req.body.content,
        date: Date.now()
    });

    let user = await User.findById(req.user._id);
    user.diaryNotes.push(diaryNote);
    await user.save();

    diaryNote = await diaryNote.save();
    return res.status(200).send(diaryNote);
}));

router.put('/:id', (async (req, res) => {
    const user = await User.findById(req.user._id);
    let diaryNote = user.diaryNotes.id(req.params.id);
    if(!diaryNote) return res.status(401).send("diaryNote not found for this user, impossible to update");

    diaryNote.content = req.body.content; //only the content, the date is the same
    await user.save();
    //updated diarynote
    res.send(diaryNote);
}));

router.delete("/:id", (async (req, res) => {
    const user = await User.findById(req.user._id);
    const diaryNote = user.diaryNotes.id(req.params.id);
    if(!diaryNote) return res.status(401).send("diaryNote not found for this user, impossible to delete");

    diaryNote.remove();
    await user.save();

    //deleted diarynote
    res.send(diaryNote);
}));

module.exports = router;
