const express = require('express');

const api = express.Router();

api.get('/', (request, response) => {
    response.json({ message: 'Hello'});
})

module.exports = api;
