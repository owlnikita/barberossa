require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    isDebug: process.env.DEBUG == 'true',
}