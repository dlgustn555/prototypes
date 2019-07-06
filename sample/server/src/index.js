const express = require('express');
const api = require('./api');

const PORT = 9003;
const server = express();

server.use(api);

server.listen(PORT, () => {
    console.log('sample Server Running on PORT: ' + PORT);
})
