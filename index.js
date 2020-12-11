const express = require("express");
const app = express();
const diary = require('./routes/diary');
const user = require('./routes/user');
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors({
    exposedHeaders: ['x-auth-token'],
}));
app.use(express.json());

//routing
app.use('/api/v1/diary', diary);
app.use('/api/v1/user', user);

//database connection
mongoose.connect("mongodb://localhost/diaryApp")
    .then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(process.env.PORT || 3000, () => {
    console.log(`running...`);
});