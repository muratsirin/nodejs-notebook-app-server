const express = require('express');
const NoteCtrl = require('../controllers/noteController');
const router = express.Router();

router.post('/note', NoteCtrl.addNote);
router.delete('/note/:id', NoteCtrl.deleteNote);
router.get('/notes/:userid', NoteCtrl.getNotes);

module.exports = router;