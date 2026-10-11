const { rateLimit } = require('express-rate-limit');
const config = require('../config');

function createRateLimiter(windowMs, limit) {
    return rateLimit({
        windowMs,
        limit,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        message: {
            success: false,
            error: 'Too many requests. Please try again later.',
        },
    });
}

const apiRateLimiter = createRateLimiter(config.rateLimitWindowMs, config.rateLimitMax);
const bookingRateLimiter = createRateLimiter(
    config.bookingRateLimitWindowMs,
    config.bookingRateLimitMax
);

module.exports = { apiRateLimiter, bookingRateLimiter };
