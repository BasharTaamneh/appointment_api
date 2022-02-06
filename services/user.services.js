const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');

async function login({ username, password }, callback) {
    const user = await User.findOne({ username });
    if (user != null) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(user._id, user.username, user.account_type);
            return callback(null, { ...user.toJSON(), token });
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
}

module.exports = {
    login,
    register
}