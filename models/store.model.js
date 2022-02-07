
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

//  mongoose store model schema
const storeSchema = new Schema({
    storename: {
        type: String,
        unique: true,
        required: true,
        maxlength: 128,
    },
    location: {
        type: String,
        required: true,
        maxlength: 256,
    },
    description: {
        type: String,
        required: true,
    },
    store_type: {
        type: String,
        default: 'Not assigned',
    },
    img: {
        type: String,
        default: 'images/placeholder.png',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
});

// customize schema returned Object
storeSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

storeSchema.plugin(uniqueValidator);

const Store = mongoose.model("store", storeSchema);

module.exports = Store;

