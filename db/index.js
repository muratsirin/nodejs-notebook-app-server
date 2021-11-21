const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/notebookDB").catch(e => {
    console.error("Database connection error", e.message);
});

const db = mongoose.connection;

module.exports= db;