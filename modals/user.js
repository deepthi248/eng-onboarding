const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please eneter the name"]
    },
    email: {
        type: String,
        required: [true, "please eneter the email"]
    },
    password: {
        type: String,
        required: [true, "please eneter the password"]
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

module.exports = User 