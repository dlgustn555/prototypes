const express = require('express');

const PORT = 9003;
const server = express();
server.listen(PORT, () => {
    console.log('sample Server Running on PORT: ' + PORT);
})