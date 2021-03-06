const bcrypt = require('bcryptjs');
const userServices = require('../services/user.services');

// register user request controller
exports.register = (req, res, next) => {
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);

    req.body.password = bcrypt.hashSync(password, salt);

    userServices.register(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: results,
        });
    });
};

// login user request controller
exports.login = (req, res, next) => {
    const { username, password } = req.body;
    userServices.login({ username, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: result,
        });
    })
};

// Update user request controller
exports.userUpdate = (req, res, next) => {
    const user = req.user
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const oldPassword = req.body.oldPassword

    if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(password, salt)
    };


    userServices.userUpdate({
        user,
        username,
        password: req.body.password,
        email, oldPassword
    }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: result,
        });
    });
};

// Delete user request controller
exports.userDelete = (req, res, next) => {
    const { oldPassword } = req.body;
    const user_id = req.user.id
    const username = req.user.username
    userServices.userDelete({ user_id, oldPassword, username }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success No Content",
            data: result,
        });
    });
};

// get user profile request controller
exports.userProfile = (req, res, next) => {
    const user_id = req.user.id
    userServices.userProfile({ user_id }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: result,
        });
    })

}