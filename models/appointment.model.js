
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

//  mongoose appointment model schema
const appointmentSchema = new Schema({
    storename: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    status: {
        type: String,
        default: 'waiting',
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
});

// customize schema returned Object
appointmentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

appointmentSchema.plugin(uniqueValidator);

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;

