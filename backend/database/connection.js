const sqlite3 = require('better-sqlite3');
const path = require('path');

const db = new sqlite3(path.join(__dirname, './database.db'), {verbose: console.log});

module.exports = db;

