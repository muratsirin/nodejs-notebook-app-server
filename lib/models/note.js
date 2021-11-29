const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema(
    {
        title: String,
        content: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Note', Note);