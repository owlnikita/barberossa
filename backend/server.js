const config = require('./config/index');
const app = require('./app');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.port, () => {
    console.log(`Example app listening on port ${port}`);
});

