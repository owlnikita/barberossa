const bookingsRepo = require('../database/bookings.repository');

function createBooking(req, res) {
    const { slotId, name, phone, email } = req.body;
    
    if ( !slotId || !name || !phone || !email ) {
        return res.status(400).json({ error: "every field is required", success: false })
    }

    try {
        const parts = date.split('-');

        if (parts.length !== 3) {
            return res.status(400).json({ error: 'invalid date format, use YYYY-MM-DD', success: false });
        }
        const [year, month, day] = parts;

        const cleanMonth = month.padStart(2, '0');
        const cleanDay = day.padStart(2, '0');
        const dateObj = new Date(`${year}-${cleanMonth}-${cleanDay}`);

        if (isNaN(dateObj.getTime())) {
            return res.status(400).json({ error: 'invalid date values', success: false });
        }
    } catch {
        return res.status(400).json({ error: 'could not process date', success: false });
    }

    try {
        bookingsRepo.createBooking(date, slotId, name, phone, email);
    } catch (err){
        return res.status(409).json({ error: 'slot_is_already_taken', success: false });
    }

    return res.status(201).json({ message: 'booking is created', success: true });    
}

function getAvailableSlots (req, res) {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: 'date string is required', success: false });
    }
    
    try {
        const slots = bookingsRepo.getAvailableSlots(date);
        return res.status(200).json({ slots, success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message, success: false });
    }
}

module.exports = {
    createBooking,
    getAvailableSlots,
}