const config = require('./config/index');
const express = require('express');
const cors = require('cors');
require('./database/schema');

const bookingRoutes = require('./routes/bookings.routes');
const { apiRateLimiter } = require('./middleware/rateLimit');
const app = express();

app.set('trust proxy', config.trustProxyHops);

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Retry-After']
}));
app.use(express.json());
app.use('/api/bookings', apiRateLimiter, bookingRoutes);

if (config.isDebug) {
    console.log("DEBUG is ON");
}

module.exports = app;