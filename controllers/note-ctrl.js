const Note = require("../models/note-model");

function addNote(req, res) {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Bir not yazınız",
    });
  }

  const note = new Note(body);

  if (!note) {
    return res.status(400).json({
      success: false,
      error: "Not kaydedilemedi",
    });
  }

  note
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: note._id,
        message: "Not kaydedildi",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        error: "Not kaydedilemedi",
      });
    });
}

async function deleteNote(req, res) {
  await Note.findByIdAndDelete(req.params.id, function (err, note) {
    if (!err) {
      if (!note) {
        return res.status(404).json({
          success: false,
          error: "Not bulunamadı",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: note,
        });
      }
    } else {
      return res.status(400).json({ success: false, error: err });
    }
  }).clone();
}

async function getNotes(req, res) {
  const userID = req.params.userid;
  await Note.find({user:userID}, function (err, notes) {
    if (!err) {
      if (!notes.length) {
        return res.status(404).json({
          success: false,
          error: "Not bulunamadı",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: notes,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  }).clone();
}

module.exports = {
  addNote,
  deleteNote,
  getNotes,
};
