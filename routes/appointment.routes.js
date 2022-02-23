const appointmentController = require('../controllers/appointment.controller');
const express = require('express');
const router = express.Router();

// express api appointment routers
router.post("/createAppointment", appointmentController.createAppointment);
router.get("/getuserAppointments", appointmentController.getuserAppointments);
router.get("/getstoreAppointments", appointmentController.getstoreAppointments);
router.put("/updateAppointment", appointmentController.updateAppointment);
router.put("/deleteAppointment", appointmentController.deleteAppointment);
module.exports = router;