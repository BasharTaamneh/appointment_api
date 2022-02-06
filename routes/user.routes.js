const userController = require('../controllers/user.controller');
const testController = require('../controllers/test.controller')
const express = require('express');
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);
router.post("/test", testController.test);

module.exports = router;
