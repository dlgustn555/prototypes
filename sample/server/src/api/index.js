const Router = require("koa-router");
const axios = require("axios");
const Joi = require("@hapi/joi");

const api = Router();

api.get("/", async ctx => {
  try {
    const url = encodeURIComponent("https://alpha-m.pay.naver.com");
    const { status, data } = await axios.get(
      `https://dev.friends.naver.com/api/v1/friends?svc=send&url=${url}`,
      {
        headers: {
          Cookie:
            'NID_AUT=yjo+Lr3G9LZAzMEjB1oOqRfuMrRGT93BwcFiCDmo3c56U9WKU7ciuhzvdqTfa6Me; NID_SES="AAAA9pR+UHmKpW/PwEo8KTgm+NvWoOp1NwiB6tOWP5ozhZ1aGoPydjTk2e4S+4a0Kuj9XE0/oI+airBoMslE2yeRyhX/EBXiudjiLMuLKQwy9caVHCHIU9d08fXG8jChOUPHaf7MBtIkvEcpM81+hRY1FPt8FdXLKVH4jWdCKJzVZqwuhFMofnMXKsDEbLpieZ2SxDIwvdXx8ThVDL5M2nuo6WvRqjgHA3qewS1GDPB58StLn8MXUp8EtrGc/QFEKNQXKxDI4XUoeunktAzwZ1tKSa/yf/rEO276kwECav4uVWrLypvv0ndB/ikWOmcRzLIGvJBPSV7FoMCw7okyZbITCy4=";'
        }
      }
    );
    ctx.body = { status, data };
  } catch (error) {
    ctx.body = error;
  }
});

const testScheme = Joi.object({
  pageCount: Joi.number(),
  totalItemCount: Joi.number(),
  hasNextPage: Joi.boolean(),
  items: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      date: Joi.number(),
      mrcNo: Joi.string(),
      product: Joi.object({
        name: Joi.string(),
        imgUrl: Joi.string(),
        infoUrl: Joi.string(),
        price: Joi.number(),
        pointPlus: Joi.boolean()
      }),
      serviceType: Joi.string(),
      status: Joi.string(),
      buttons: Joi.array()
    })
  )
});
api.get("/test", async ctx => {
  const { name, age } = ctx.request.query;

  const test = await new Promise((resolve, _) => {
    return resolve({ name, age });
  });
  try {
    const result = await testScheme.validateAsync({ pageCount: "abcdef" });
    console.log(result);
    ctx.body = result;
  } catch (e) {
    console.log("ERROR: ", e);
    ctx.body = "FAIL...";
  }
});

api.get("/callbackCount/:number", ctx => {
  ctx.body = ctx.params.number;
});

module.exports = api.routes();
