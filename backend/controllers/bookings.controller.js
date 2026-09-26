/**
 * @param { number } = is_active
 * @param { string } = date
 * @param { string } = timeSlot
 */

const bookingsRepo = require('../database/bookings.repository');
const { validateDate, validateTimeSlot } = require('../utils/validation.js');


function createBooking(req, res) {
    const { slotId, name, phone, email } = req.body;
    
    if ( !slotId || !name || !phone || !email ) {
        return res.status(400).json({ error: "every field is required", success: false })
    }

    let validDate;
    try {
        validDate = validateDate(date);
    } catch(err) {
        return res.status(400).json({ error: err.message, success: false });
    }

    try {
        bookingsRepo.createBooking(validDate, slotId, name, phone, email);
    } catch (err){
        return res.status(409).json({ error: err.message, success: false });
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

function createSlot(req, res) {
    const { date, time_slot, capacity, is_active=1 } = req.body;

    if (!date || !time_slot || !capacity) {
        return res.status(400).json({ error: 'all fields are requiered', success: false})
    }
    if( typeof capacity !== 'number' || capacity < 0) {
        return res.status(400).json({ error: "Invalid value for 'capacity'", success: false });
    }

    let validDate;
    try {
        validDate = validateDate(date);
        validateTimeSlot(time_slot);
        bookingsRepo.createSlot(date, time_slot, capacity, is_active);
        return res.status(201).json({ message: "Created slot successfuly", success: true });
        
    } catch (err) {
        return res.status(400).json({ error: err.message, success: false });
    }


}

module.exports = {
    createBooking,
    createSlot,
    getAvailableSlots,
}