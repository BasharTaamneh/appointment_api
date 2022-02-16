const storeServices = require('../services/store.services');

// create store request controller
exports.createStore = (req, res, next) => {

    const { storename, location, description, store_type } = req.body;

    let img
    if (req.file != undefined) {
        img = "images/" + req.file.filename;
    }

    storeServices.createStore({
        storename,
        location,
        description,
        store_type,
        img,
        owner: req.user.id
    }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: results,
        });
    });
};

// get user stores list request controller
exports.getuserStores = (req, res, next) => {

    const owner = req.user.id;

    storeServices.getuserStores({ owner }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: results,
        });
    });
};

// get & search stores list request controller
exports.searchStoreslist = (req, res, next) => {
    const search_key = req.query.search_key;
    storeServices.searchStoreslist({ search_key }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: results,
        });
    });
};

// update Store request controller
exports.updateStore = (req, res, next) => {
    const { storename, location, description, store_type, store_id } = req.body;

    let img
    if (req.file != undefined) {
        img = "images/" + req.file.filename;
    }
    storeServices.updateStore({
        store_id,
        storename,
        location,
        description,
        store_type,
        img,
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

// delete stores request controller
exports.deleteStore = (req, res, next) => {
    const store_id = req.body
    storeServices.deleteStore(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: results,
        });
    });
};