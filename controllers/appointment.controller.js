const appointmentServices = require('../services/appointment.services')

//  create appointments request controller
exports.createAppointment = (req, res, next) => {
    const { storename, date, time, status } = req.body;
    const user = req.user.username
    appointmentServices.createAppointment(
        {
            storename,
            date,
            time,
            status,
            user
        }
        , (error, results) => {
            if (error) {
                return next(error);
            }
            return res.status(200).send({
                message: "success",
                data: results,
            });
        });
};

// get user Appointments list request controller
exports.getuserAppointments = (req, res, next) => {
    const user = req.user.username
    appointmentServices.getuserAppointments({ user }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: results,
        });
    });
};

// get store Appointments list request controller
exports.getstoreAppointments = (req, res, next) => {
    const storename = req.query.storename
    appointmentServices.getstoreAppointments({ storename }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: results,
        });
    });
};

// update Appointment request controller
exports.updateAppointment = (req, res, next) => {
    const { date, time, appointment_id, status } = req.body;
    appointmentServices.updateAppointment({
        appointment_id,
        date,
        time,
        status
    }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: results,
        });
    })
};