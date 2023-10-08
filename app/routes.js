const express = require('express');
const router = express.Router();
const controller = require('./controller/index');


// Registration route
router.post('/register', controller.register);

// Login route
router.post('/login', controller.login); 

// Booking route
router.post('/booking', controller.booking);

module.exports = router;