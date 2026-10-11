const assert = require('node:assert/strict');
const { once } = require('node:events');
const { test } = require('node:test');

process.env.RATE_LIMIT_WINDOW_MS = '60000';
process.env.RATE_LIMIT_MAX = '10';
process.env.BOOKING_RATE_LIMIT_WINDOW_MS = '60000';
process.env.BOOKING_RATE_LIMIT_MAX = '1';
process.env.TRUST_PROXY_HOPS = '0';

const app = require('../app');

test('rate limits booking submissions and the booking API by client IP', async () => {
    const server = app.listen(0);
    await once(server, 'listening');
    const { port } = server.address();
    const request = (path, options = {}) => fetch(`http://127.0.0.1:${port}${path}`, options);

    try {
        const firstBooking = await request('/api/bookings/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        });
        assert.equal(firstBooking.status, 400);

        const blockedBooking = await request('/api/bookings/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        });
        assert.equal(blockedBooking.status, 429);
        assert.ok(blockedBooking.headers.get('retry-after'));

        for (let requestNumber = 0; requestNumber < 8; requestNumber += 1) {
            const response = await request('/api/bookings/avslots');
            assert.equal(response.status, 400);
        }

        const blockedApiRequest = await request('/api/bookings/avslots');
        assert.equal(blockedApiRequest.status, 429);
        assert.ok(blockedApiRequest.headers.get('ratelimit'));
    } finally {
        const closed = new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
        server.closeAllConnections();
        await closed;
    }
});
