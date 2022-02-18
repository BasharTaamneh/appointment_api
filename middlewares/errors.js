
//  handling the errors that occur during the API use
function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        // custom application errors
        return res.status(400).send({ message: err });
    }

    if (err.name === "ValidationError") {
        // mongoose validation errors
        return res.status(400).send({ message: err.message });
    }

    if (err.name === "UnauthorizedError") {
        // jwt authentication errors
        return res.status(401).send({ message: "Token not valid" });
    }

    // default to 400 server errors
    return res.status(400).send({ message: err.message });
}


module.exports = {
    errorHandler,
};