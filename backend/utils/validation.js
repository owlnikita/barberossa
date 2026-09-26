function validateDate(date) {
    if (!date) {
        throw new Error("Argement 'date' is missing.");
    }
    if (typeof date !== 'string') {
        throw new Error("Argument date has to be string.");
    }
    const parts = date.split('-');
    if (parts.length !== 3) {
        throw new Error("Invalid date format, use YYYY-MM-DD");
    }
    const [year, month, day] = parts;
    const cleanMonth = month.padStart(2, '0');
    const cleanDay = day.padStart(2, '0');

    // Formatting to ISO string YYYY-MM-DD
    const formattedDate = `${year}-${cleanMonth}-${cleanDay}`;
    const dateObj = new Date(formattedDate);

    // Validating the date
    if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date values");
    }

    return formattedDate;
}

function validateTimeSlot(timeSlot) {
    if (typeof timeSlot !== 'string') {
        throw new Error("TimeSlot has to a string");
    }
    const fromToParts = timeSlot.split('-');
    if (fromToParts.length !== 2) {
        throw new Error("Invalid date format, use HH:MM-HH:MM");
    }

    const [from, to] = fromToParts;

    const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!timePattern.test(from) || !timePattern.test(to)) {
        throw new Error("Invalid time format, use HH:MM-HH:MM (00:00-23:59)");
    }

    const toMinutes = (time) => {
        const [hour, minutes] = time.split(":").map(Number);
        return hour * 60 + minutes;
    }

    const fromMinutesVal = toMinutes(from);
    const toMinutesVal = toMinutes(to);
    if (fromMinutesVal >= toMinutesVal) {
        throw new Error("Start time must be before end time");
    }
    return true;
}

module.exports = {
    validateDate,
    validateTimeSlot
}