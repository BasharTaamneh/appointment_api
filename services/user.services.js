const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
const fs = require('fs')
const User = require('../models/user.model');
const Store = require('../models/store.model')
const Appointment = require('../models/appointment.model');

//  handle login user request
async function login({ username, password }, callback) {
    const user = await User.findOne({ username });
    if (user != null) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(user._id, user.username, user.account_type, user.email);
            return callback(null, { access: token });
        }
        else {
            return callback({
                message: "Invalide password !"
            })
        }
    }
    else {
        return callback({
            message: "Invalide username !"
        });
    };
};

//  handle register user request
async function register(params, callback) {
    if (params.username == undefined) {
        return callback({
            message: "Username Required"
        });
    }
    else if (params.email == undefined) {
        return callback({
            message: "Email Required"
        });
    }
    else if (params.password == undefined) {
        return callback({
            message: "Password Required"
        });
    }
    else if (params.account_type == undefined) {
        return callback({
            message: "AccountType Required"
        });
    }
    const user = new User(params);
    user.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

async function userProfile(params, callback) {
    User.findOne({ _id: params.user_id })
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

//  handle Update user request
async function userUpdate(params, callback) {
    const user_id = params.user.id
    const password = params.oldPassword
    const username = params.username
    const email = params.email
    const newpassword = params.password


    if (params.oldPassword == undefined) {
        return callback({
            message: "Current Password Required"
        });
    };
    const user = await User.findOne({ _id: user_id  })
    if (!bcrypt.compareSync(password, user.password)) {
        return callback({
            message: "Current Password Incorrect !"
        });
    };
    User.findByIdAndUpdate(user_id, {
        username: username,
        email: email,
        password: newpassword
    })
        .then(async () => {
            const userupdated = await User.findOne({_id: user_id })
            return callback(null, { ...userupdated.toJSON() });
        })
        .catch((error) => {
            return callback(error);
        });
};

//  handle Delete user request
async function userDelete(params, callback) {

    if (params.oldPassword == undefined) {
        return callback({
            message: "Current Password Required"
        });
    };
    const user_id = params.user_id
    const password = params.oldPassword
    const username = params.username
    const user = await User.findOne({ _id: user_id  })
    if (!bcrypt.compareSync(password, user.password)) {
        return callback({
            message: "Current Password Incorrect !"
        });
    };

    let path = './public/uploads/images/'
    fs.readdir(path, (error, files) => {
        files.forEach(file => {
            if (file.includes(user_id)) {
                fs.unlinkSync(path + file)
                // user files removed from file system
            }
        })
        if (error) {
            return callback(error);
        }
    });
    // remove user Appointments
    Appointment.deleteMany({ user: username }).then((response) => {
        callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
    // remove user Stores
    Store.deleteMany({ owner: user_id }).then((response) => {
        callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
    // remove user
    User.deleteOne({ _id: user_id })
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

module.exports = {
    register,
    login,
    userProfile,
    userUpdate,
    userDelete
}