const Router = require("koa-router")
const books = require("./books")
const auths = require("./auth")

const api = new Router()

api.use("/books", books.routes())
api.use("/auth", auths.routes())

module.exports = api
