require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const mongoose = require('mongoose');
require('./models/user-model');
require('./config/passport');
const noteRouter = require("./routes/note-router");
const userRouter = require('./routes/user-router');
const session = require("express-session");

mongoose.promise = global.Promise;
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.use(session({
    secret: "This is top secret",
    resave: false,
    saveUninitialized: false,
}));

db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.use("/api", noteRouter, userRouter);

app.listen(3000, function () {
    console.log('Server started at port 3000');
});