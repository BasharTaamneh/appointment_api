const Store = require('../models/store.model')
const fs = require('fs')

//  handle create store request
async function createStore(params, callback) {
    if (params.storename == undefined) {
        return callback({
            message: "storename Required"
        });
    }
    else if (params.location == undefined) {
        return callback({
            message: "location Required"
        });
    }
    else if (params.description == undefined) {
        return callback({
            message: "description Required"
        });
    }

    const store = new Store(params);
    store.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//  handle user stores list request
async function getuserStores(params, callback) {
    Store.find({ owner: params.owner }).then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
};

//  handle search stores list request
async function searchStoreslist(params, callback) {
    if (params.search_key == undefined) {
        return callback({
            message: "search_key Required"
        });
    };
    const key = params.search_key
    Store.find({ storename: { $regex: key } }).then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
};

//  handle update store request
async function updateStore(params, callback) {
    if (params.store_id == undefined) {
        return callback({
            message: "store_id Required"
        });
    }
    const id = params.store_id
    Store.findByIdAndUpdate(id, params)
        .then(async () => {
            const storeupdated = await Store.findOne({ id })
            return callback(null, { ...storeupdated.toJSON() });
        })
        .catch((error) => {
            return callback(error);
        });
};

//  handle delete store request
async function deleteStore(params, callback) {
    if (params.store_id == undefined) {
        return callback({
            message: "store_id Required"
        });
    }
    const id = params.store_id
    try {
        const store = await Store.findOne({ _id: id })
        let path
        if (store) {
            path = './public/uploads/' + store.img
        }
        if (path) {
            fs.unlinkSync(path)
            //store file removed from file system
        }
    } catch (error) {
        return callback(error);
    }
    Store.deleteOne({ _id: id }).then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
};


module.exports = {
    createStore,
    getuserStores,
    searchStoreslist,
    updateStore,
    deleteStore
}