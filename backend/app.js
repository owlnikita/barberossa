const config = require('./config/index');
const express = require('express');
const cors = require('cors');
require('./database/schema');

const bookingRoutes = require('./routes/bookings.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/bookings', bookingRoutes);

if (config.isDebug) {
    console.log("DEBUG is ON");
}

module.exports = app;