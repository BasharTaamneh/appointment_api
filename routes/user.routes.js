const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

// express api user routers
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/user-update", userController.userUpdate);
router.delete("/user-delete", userController.userDelete);


module.exports = router;
