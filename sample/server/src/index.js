const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const api = require('./api');

const PORT = 9003;
const server = new Koa();

server.use(api);

server.listen(PORT, () => {
    console.log('sample Server Running on PORT: ' + PORT);
})
