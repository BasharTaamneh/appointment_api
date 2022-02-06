const { ReturnDocument } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 64,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 128,
    },
    password: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        required: true,
        maxlength: 16,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password
    }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("user", userSchema);

module.exports = User;