import { getAvailableSlots } from "./booking.js";

const slotsContainer = document.getElementById('slots__container');

function renderSlots(slots) {
    slotsContainer.innerHTML = slots
    .map(slot => `
        <li class="slot-item">
            <label class="time-info">
                <span class="info-from-to">${slot.time_slot}</span>
                <input type="radio" name="slot" slotId="${slot.id}" value="${slot.time_slot}" required>
            </label>
        </li>
    `).join('');
}

export async function handleDateClick(date) {
    const slots = await getAvailableSlots(date, (freshSlots) => {
        renderSlots(freshSlots);
        console.log('Данные обновились в фоне..');
    });
    renderSlots(slots);
}

