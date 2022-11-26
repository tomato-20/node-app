require('dotenv').config();
const http = require('http');

const app = require('../../src/app');

const PORT = process.env.APP_PORT,
    HOST = process.env.APP_HOST;

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
    console.log(`listening on http://localhost:${PORT}`)
})
