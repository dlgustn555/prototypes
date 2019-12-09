const Router = require("koa-router")
const booksCtrl = require("./books.controller")

const books = new Router()

books.get("/", booksCtrl.list)
books.get("/:id", booksCtrl.get)
books.post("/", booksCtrl.create)
books.delete("/:id", booksCtrl.delete)
books.put("/:id", booksCtrl.replace)
books.patch("/:id", booksCtrl.update)

module.exports = books
