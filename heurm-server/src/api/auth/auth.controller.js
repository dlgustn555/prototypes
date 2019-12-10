const Joi = require("joi")
const Account = require("../../models/account")

// 로컬 회원가입
exports.localRegister = async ctx => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  })

  const result = Joi.validate(ctx.request.body, schema)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }

  let account = null
  try {
    account = await Account.localRegister(ctx.request.body)
  } catch (e) {
    ctx.throw(500, e)
  }

  let token = null
  try {
    token = await account.generateToken()
  } catch (e) {
    ctx.throw(500, e)
  }

  ctx.cookies.set("access_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  })
  ctx.body = account.profile
}

// 로컬 로그인
exports.localLogin = async ctx => {
  try {
    const account = await Account.findByEmailOrUsername(ctx.request.body)

    if (!account || !account.validatePassword(ctx.request.body.password)) {
      ctx.status = 404
      ctx.body = { message: "Book Not Found!!" }
      return
    }

    const token = await account.generateToken()

    ctx.cookies.set("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
    ctx.body = account.profile
  } catch (e) {
    ctx.throw(500, e)
  }
}

// 로그아웃
exports.logout = async ctx => {
  ctx.cookies.set("access_token", null, {
    maxAge: 0,
    httpOnly: true
  })
  ctx.status = 204
}

exports.exists = async ctx => {
  ctx.body = "exists"
}

exports.check = ctx => {
  const { user } = ctx.request

  if (!user) {
    ctx.status = 403
    return
  }
  ctx.body = user.profile
}
