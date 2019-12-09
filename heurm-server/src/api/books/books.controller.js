const Book = require("../../models/book")
const Joi = require("joi")
const {
  Types: { ObjectId }
} = require("mongoose")

exports.list = async ctx => {
  try {
    const books = await Book.find()
      .sort({ _id: -1 })
      .limit(3)
      .exec()
    ctx.body = books
  } catch (e) {
    return ctx.throw(500, e)
  }
}

exports.get = async ctx => {
  const { id } = ctx.params

  try {
    const book = await Book.findById(id).exec()
    if (!book) {
      ctx.status = 404
      ctx.body = { message: "Book Not Found!!" }
      return
    }
    ctx.body = book
  } catch (e) {
    if (e.name === "CastError") {
      ctx.status = 400
      return
    }
    return ctx.throw(500, e)
  }
}

exports.create = async ctx => {
  const { title, authors, publishedDate, price, tags } = ctx.request.body

  // Book 인스턴스를 생성한다.
  const book = new Book({ title, authors, publishedDate, price, tags })

  try {
    await book.save()
    ctx.body = book
  } catch (e) {
    return ctx.throw(500, e)
  }
}

exports.delete = async ctx => {
  const { id } = ctx.params

  try {
    await Book.findByIdAndRemove(id).exec()
    ctx.status = 204
  } catch (e) {
    if (e.name === "CastError") {
      ctx.status = 400
    }
  }

  ctx.body = "deleted"
}

exports.replace = async ctx => {
  const { id } = ctx.params

  if (!ObjectId.isValid(id)) {
    ctx.status = 400
    return
  }

  const schema = Joi.object().keys({
    title: Joi.strict().required(),
    authors: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required()
      })
    ),
    publishedDate: Joi.date().required(),
    price: Joi.number().required(),
    tags: Joi.array().items(Joi.string().required())
  })

  const result = Joi.validate(ctx.request.body, schema)

  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }

  const config = {
    upsert: true,
    new: true
  }

  try {
    const book = await Book.findByIdAndUpdate(id, ctx.request.body, config)
    ctx.body = book
  } catch (e) {
    return ctx.throw(500, e)
  }
}

exports.update = async ctx => {
  const { id } = ctx.params

  if (!ObjectId.isValid(id)) {
    ctx.status = 400
    return
  }

  try {
    const book = await Book.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    })
    ctx.body = book
  } catch (e) {
    return ctx.throw(500, e)
  }
}
