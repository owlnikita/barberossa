const config = require('./config/index');
const express = require('express');
const app = express();

if (config.isDebug) {
    console.log("DEBUG is ON");
}

module.exports = app;