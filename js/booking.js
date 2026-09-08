const slotsCache = new Map();
const STALE_AFTER = 15000; // 15 sec

export async function getAvailableSlots(date, onUpdate) {
    const cached = slotsCache.get(date);

    if (cached) {
        const isStale = Date.now() - cached.timestamp > STALE_AFTER;
        if (isStale) revalidate(date, onUpdate);
        return cached.data;
    }

    const data = await fetchSlots(date);
    slotsCache.set(date, { data, timestamp: Date.now() });
    return data;    
}

async function fetchSlots(date) {
    try {
        const response = await fetch(`http://localhost:3000/api/bookings/avslots?date=${date}`, 
            {
                headers: {
                    'Accept': 'application/json'
                }
            });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.slots;
    } catch (error) {
        throw new Error(`Request error: ${error}`);
    }
}

async function revalidate(date, onUpdate) {
    const fresh = await fetchSlots(date);
    const cached = slotsCache.get(date);

    if (JSON.stringify(fresh) !== JSON.stringify(cached?.data)) {
        onUpdate?.(fresh);
    }

    slotsCache.set(date, 
        {
            data: fresh, timestamp: Date.now()
        });

    
}

export async function createBooking(name, email, phone, slotId, onSuccess) {
    if (!name || !email || !phone || !slotId) {
        console.error("All fields are required");
        return;
    }

    const response = await fetch('http://api/bookings/book', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            slotId: parseInt(slotId) 
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = response.json();

    if (!data.success) {
        return console.error('Could not create booking', data.error);
    }

    if (typeof onSuccess === 'function') {
        onSuccess(response);
    }

    return data;
}
// доделай чепуху эту и получи данные с формы