const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, `${process.env.JWT_SCERETKEY}`, (err, user) => {
        if (user) {
            req.user = user
        };
        if (err) {
            return next(err)
        };
        next();
    });
};

function generateAccessToken(id, username, account_type) {

    return jwt.sign({

        username: username,
        account_type: account_type,
        id: id,

    },
        `${process.env.JWT_SCERETKEY}`,
        {
            expiresIn: "2h"
        });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}