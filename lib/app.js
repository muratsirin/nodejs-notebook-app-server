require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db');
const mongoose = require('mongoose');
require('./models/user');
require('../config/passport');
const noteRouter = require('./routes/noteRouter');
const userRouter = require('./routes/userRouter');
const session = require('express-session');

mongoose.promise = global.Promise;
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use('/api', noteRouter, userRouter);

app.listen(3000, function () {
    console.log('Server started at port 3000');
});