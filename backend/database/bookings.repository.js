const db = require('./connection');

const createBooking = db.transaction((slotId, name, phone, email) => {
    const slot = db.prepare(`
        SELECT capacity from slots
        WHERE id = ? AND is_active = 1
    `).get(slotId);

    if (!slot) {
        throw new Error('SLOT_NOT_FOUND');
    }
    
    const count = countBookingsForSlot(slotId);

    if (count >= slot.capacity) {
        throw new Error('SLOT_FULL');
    }

    return db.prepare(`
        INSERT INTO bookings (slot_id, name, email, phone)
        VALUES (?, ?, ?, ?)
    `).run(slotId, name, email, phone);
});

function getBookingsBySlot (slotId) {
    return db.prepare('SELECT * FROM bookings WHERE slot_id = ?').all(slotId);
}

function countBookingsForSlot(slotId) {
  const { count } = db.prepare(
    'SELECT COUNT(*) as count FROM bookings WHERE slot_id = ?'
  ).get(slotId);
  return count;
}

function getAvailableSlots(date) {
    if (typeof(date) != 'string') {
        throw new Error('the argument has to be a string');
    }
    return db.prepare(`
        SELECT s.id, s.time_slot, s.capacity, COUNT(b.id) as booked_count FROM slots s
        LEFT JOIN bookings b ON b.slot_id = s.id
        WHERE date = ? AND s.is_active = 1
        GROUP BY s.id
        HAVING booked_count < s.capacity
    `).all(date);
}



module.exports = {
    createBooking,
    getBookingsBySlot,
    countBookingsForSlot,
    getAvailableSlots,
}