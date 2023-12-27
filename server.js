const http = require('http');
const app = require('./app/app');

require('dotenv').config();

const { PORT } = process.env;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}`);
});
