const express = require('express');
const UserCtrl = require('../controllers/userController');
const auth = require('../helpers/authHelper');
const router = express.Router();

router.post('/register', auth.optional, UserCtrl.register);
router.post('/login', auth.optional, UserCtrl.login);
router.get('/current-user', auth.required, UserCtrl.getUser);

module.exports = router;