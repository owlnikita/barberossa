const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');


router.get('/avslots', bookingsController.getAvailableSlots);
router.post('/book', bookingsController.createBooking);

module.exports = router;