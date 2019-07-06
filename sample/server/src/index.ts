const express = require('express');
const PORT = 9003;

const server = express();

server.listen(PORT, () => {
    console.log(`Sample Server is Running in PORT : ${PORT}`);
})
