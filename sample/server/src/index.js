const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const api = require("./api");
const { Buffer } = require("buffer");
const { Iconv } = require("iconv");

const PORT = 9003;
const server = new Koa();

server.use(api);
const str = "ÃÖ¼ö¿µ";
const iconv = new Iconv("UTF-8", "ISO-8859-1");
console.log(iconv.convert(str).toString());
server.listen(PORT, () => {
  console.log("sample Server Running on PORT: " + PORT);
});
