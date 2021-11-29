const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const passport = require('passport');
const {log} = require("nodemon/lib/utils");

function register(req, res) {
    const user = req.body;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                success: false,
                email: 'Please, fill in the email field',
            }
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                success: false,
                email: 'Please, fill in the password field'
            }
        });
    }

    const registerUser = new Users(user);
    registerUser.setPassword(user.password);

    return registerUser.save().then(() => res.json({user: registerUser.toAuthJSON()}));
}

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        return res.status(422).json({
            errors: {
                success: false,
                email: 'Please, fill in the email field'
            }
        });
    }

    if (!password) {
        return res.status(422).json({
            errors: {
                success: false,
                email: 'Please, fill in the password field'
            }
        });
    }

    return passport.authenticate('local', {session: false}, function (err, passportUser, info) {
        console.log(info);
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({user: user.toAuthJSON()});
        }

        return res.status(400).send(info);
    })(req, res, next);
}

function getUser(req, res) {
    const {payload: {id}} = req;

    return Users.findById(id).then((user) => {
        if (!user) {
            return res.sendStatus(400);
        }
        return res.json({user: user.toAuthJSON()});
    });
}

module.exports = {register, login, getUser};

