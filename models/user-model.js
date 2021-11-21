const mongoose = require("mongoose");
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const usersSchema = new Schema({
    name: String,
    lastName: String,
    email: {type: String, unique: true},
    hash: String,
    salt: String,
}, {
    timestamps: true,
});

usersSchema.methods.setPassword = function (password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000,512,'sha512').toString('hex');
}

usersSchema.methods.validatePassword = function (password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

usersSchema.methods.generateJWT = function (){
    const today = new Date();
    const expirationDate = new Date(today);

    expirationDate.setDate(today.getDate()+60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime()/1000,10)
    }, process.env.SECRET);
}

usersSchema.methods.toAuthJSON = function (){
    return{
        _id : this._id,
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        token: this.generateJWT()
    };
}

mongoose.model('Users', usersSchema);


