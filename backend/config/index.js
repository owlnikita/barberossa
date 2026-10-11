require('dotenv').config();

function readPositiveInteger(name, fallback) {
    const value = process.env[name];
    if (value === undefined || value.trim() === '') {
        return fallback;
    }

    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed) || parsed <= 0) {
        throw new Error(`${name} must be a positive integer`);
    }

    return parsed;
}

function readNonNegativeInteger(name, fallback) {
    const value = process.env[name];
    if (value === undefined || value.trim() === '') {
        return fallback;
    }

    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed) || parsed < 0) {
        throw new Error(`${name} must be a non-negative integer`);
    }

    return parsed;
}

module.exports = {
    port: process.env.PORT,
    isDebug: process.env.DEBUG == 'true',
    rateLimitWindowMs: readPositiveInteger('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
    rateLimitMax: readPositiveInteger('RATE_LIMIT_MAX', 100),
    bookingRateLimitWindowMs: readPositiveInteger('BOOKING_RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
    bookingRateLimitMax: readPositiveInteger('BOOKING_RATE_LIMIT_MAX', 5),
    trustProxyHops: readNonNegativeInteger('TRUST_PROXY_HOPS', 0),
};