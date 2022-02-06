const bcrypt  = require('bcryptjs');
const userServices = require('../services/user.services');

exports.register = (req, res, next) => {
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);

    req.body.password = bcrypt.hashSync(password, salt);

    userServices.register(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;
    // console.log(req.body);
    userServices.login({ username, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: result,
        });
    })
}

exports.userProfile =  (req, res, next) => {
    return res.status(200).json({ message: "Authorized User !"});
};