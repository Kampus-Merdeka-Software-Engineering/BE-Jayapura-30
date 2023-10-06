const express = require('express');
const router = express.Router();
const controller = require('./controller/index'); // Import controller


// Registration route
router.post('/register', controller.register);

// Login route
router.post('/login', controller.login);

module.exports = router;