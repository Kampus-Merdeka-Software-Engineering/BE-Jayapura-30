const express = require('express');
const router = express.Router();
const controller = require('./controller/index'); // Import controller


// Registration route
router.post('/register', controller.register);

// Login route
router.post('/login', controller.login); 

// Booking roure
router.post('/booking', controller.booking);

module.exports = router;