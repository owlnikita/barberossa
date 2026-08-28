const config = require('./config/index');
const app = require('./app');
const db = require('./database/connection');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});

function gracefulShutdown(signal) {
  console.log("Got signal ", signal, ". Stopping the server...");
  server.close(() => {
    console.log("HTTP-server has been closed...");
    db.close();
    console.log("Database connection has been closed...");
    process.exit(0);
  });
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
