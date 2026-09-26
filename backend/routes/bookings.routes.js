const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');
const authMiddleware = require('../middleware/adminAuth.js');


router.get('/avslots', bookingsController.getAvailableSlots);
router.post('/book', bookingsController.createBooking);
router.post('/create-slot', authMiddleware.requireAdminKey , bookingsController.createSlot);

module.exports = router;