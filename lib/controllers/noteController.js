const Note = require('../models/note');

function addNote(req, res) {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Please, fill in all required fields',
        });
    }

    const note = new Note(body);

    note.save().then(() => {
        return res.status(201).json({
            success: true,
            message: 'Note successfully saved',
        });
    }).catch((error) => {
        return res.status(400).json({
            success: false,
            error: error,
        });
    });
}

async function deleteNote(req, res) {
    await Note.findByIdAndDelete(req.params.id, function (err, note) {
        if (!err) {
            if (!note) {
                return res.status(404).json({
                    success: false,
                    error: 'Note not found',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Note successfully deleted'
            });
        }
        return res.status(400).json({
            success: false,
            error: err
        });
    }).clone();
}

async function getNotes(req, res) {
    const userID = req.params.userid;
    await Note.find({user: userID}, function (err, notes) {
        if (!err) {
            if (!notes.length) {
                return res.status(404).json({
                    success: false,
                    error: 'Notes not found',
                });
            }
            return res.status(200).json({
                success: true,
                data: notes,
            });
        }
        return res.status(400).json({
            success: false,
            error: err,
        });
    }).clone();
}

module.exports = {
    addNote,
    deleteNote,
    getNotes,
};
