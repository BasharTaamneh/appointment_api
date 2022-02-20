const jwt = require('jsonwebtoken')

// check for authorized users
function authenticateToken(req, res, next) {
    if (req.url.startsWith("/images")){
        next();
    }
    else{
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
    }
};

// generate AccessTokens for users
function generateAccessToken(id, username, account_type, email) {
    return jwt.sign({
        email: email,
        username: username,
        account_type: account_type,
        id: id,
    },
        `${process.env.JWT_SCERETKEY}`,
        {
            expiresIn: "24h"
        });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}
