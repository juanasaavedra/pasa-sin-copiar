const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Get all bookings (admin)
router.get('/', bookingController.getAllBookings.bind(bookingController));

// Get availability for a specific date
router.get('/availability', bookingController.getAvailability.bind(bookingController));

// Create a new booking
router.post('/', bookingController.createBooking.bind(bookingController));

// Cancel a booking
router.delete('/:id', bookingController.cancelBooking.bind(bookingController));

module.exports = router;
