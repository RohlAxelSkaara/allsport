const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: { // pass in config object. and put in validation rules
        type: String,
        required: true,
        unique: true // mongoose will check that record should be unique before saving to db. can do exact same thing to username
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10,  (error, hash) => {
        user.password = hash
        next()
    });
});

const User = mongoose.model('User',UserSchema);
module.exports = User