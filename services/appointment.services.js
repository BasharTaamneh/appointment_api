const Appointment = require('../models/appointment.model');

//  handle create appointment request
async function createAppointment(params, callback) {
    if (params.storename == undefined) {
        return callback({
            message: "storename Required"
        });
    }
    else if (params.date == undefined) {
        return callback({
            message: "date Required"
        });
    }
    else if (params.user == undefined) {
        return callback({
            message: "user Required"
        });
    }

    const appointment = new Appointment(params);
    appointment.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
};

//  handle user appointments list request
async function getuserAppointments(params, callback) {
    Appointment.find({ user: params.user }).then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
};

//  handle  store appointments list request
async function getstoreAppointments(params, callback) {
    if (params.storename == undefined) {
        return callback({
            message: "storename Required"
        });
    };
    const storename = params.storename
    Appointment.find({ storename: storename }).then((response) => {
        return callback(null, response);
    })
        .catch((error) => {
            return callback(error);
        });
};

//  handle update appointments request
async function updateAppointment(params, callback) {
    if (params.appointment_id == undefined) {
        return callback({
            message: "appointment_id Required"
        });
    };
    const id = params.appointment_id;
    Appointment.findByIdAndUpdate(id, params)
        .then(async () => {
            const appointmentupdated = await Appointment.findOne({ id })
            return callback(null, { ...appointmentupdated.toJSON() });
        })
        .catch((error) => {
            return callback(error);
        });
}


module.exports = {
    createAppointment,
    getuserAppointments,
    getstoreAppointments,
    updateAppointment
}