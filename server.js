const http = require('http');
const app = require('./app/app');
const dbConnect = require('./config/dbConnect');

require('dotenv').config();

const { PORT, DATABASE } = process.env;

const server = http.createServer(app);

dbConnect(DATABASE);

server.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}`);
});
