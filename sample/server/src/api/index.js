const Router = require('koa-router')
const axios = require('axios')

const api = Router();

api.get('/', async (ctx) => {
    try {
        const url = encodeURIComponent('https://alpha-m.pay.naver.com')
        const {status, data} = await axios.get(`https://dev.friends.naver.com/api/v1/friends?svc=send&url=${url}`, {
            headers: {
                Cookie: 'NID_AUT=yjo+Lr3G9LZAzMEjB1oOqRfuMrRGT93BwcFiCDmo3c56U9WKU7ciuhzvdqTfa6Me; NID_SES="AAAA9pR+UHmKpW/PwEo8KTgm+NvWoOp1NwiB6tOWP5ozhZ1aGoPydjTk2e4S+4a0Kuj9XE0/oI+airBoMslE2yeRyhX/EBXiudjiLMuLKQwy9caVHCHIU9d08fXG8jChOUPHaf7MBtIkvEcpM81+hRY1FPt8FdXLKVH4jWdCKJzVZqwuhFMofnMXKsDEbLpieZ2SxDIwvdXx8ThVDL5M2nuo6WvRqjgHA3qewS1GDPB58StLn8MXUp8EtrGc/QFEKNQXKxDI4XUoeunktAzwZ1tKSa/yf/rEO276kwECav4uVWrLypvv0ndB/ikWOmcRzLIGvJBPSV7FoMCw7okyZbITCy4=";'
            }
        })
        ctx.body = {status, data}
    } catch (error) {
        ctx.body = error
    }
    
})

api.get('/callbackCount/:number', ctx => {
    ctx.body = ctx.params.number
})

module.exports = api.routes();
