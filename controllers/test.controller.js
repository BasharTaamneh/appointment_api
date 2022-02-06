const testServices = require('../services/test.services')

exports.test = (req, res, next) => {
    const { test } = req.body;
    console.log(req.user.id);
    testServices.test(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};