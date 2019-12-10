require("dotenv").config()
const Koa = require("koa")
const Router = require("koa-router")
const api = require("./api")
const { jwtMiddleware } = require("./lib/token")

const mongoose = require("mongoose")
const bodyParser = require("koa-bodyparser")

mongoose.Promise = global.Promise

const config = { useNewUrlParser: true }
mongoose.connect(process.env.MONGO_URI, config).then(() => {
  console.log("Successfully connected to mongodb!!")
})

const app = new Koa()
const router = new Router()
const PORT = process.env.PORT || 4000

router.use("/api", api.routes())

app.use(bodyParser())
app.use(jwtMiddleware)
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`heurm-server is listening to PORT ${PORT}`)
})
