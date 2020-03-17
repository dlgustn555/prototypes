const Joi = require("joi")
const Account = require("../../models/account")

exports.localRegister = async ctx => {
  let account = null
  try {
    account = await Account.localRegister(ctx.request.body)
  } catch(e) {
    ctx.throw(500, e)
  }

  let token = null
  try {
    token = await account.generateToken()
  } catch(e) {
    ctx.throw(500, e)
  }
  ctx.cookies.set('access_token', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7})
  ctx.body = account.profile
}

exports.localLogin = async ctx => {
  let account = null
  try {
    account = await Account.findByEmailOrUsername(ctx.request.body)
    if (!account || !account.validatePassword(ctx.request.body.password)) {
      ctx.status = 404
      ctx.body = {message: "Account Not Found!!"}
    }
    ctx.body = account
  } catch (e) {
    ctx.throw(500, e)
  }
  
  let token = null
  try {
    token = await account.generateToken()
  } catch (e) {
    ctx.throw(500, e)
  }
  ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
  ctx.body = account.profile
}

exports.exists = async ctx => {
  ctx.body = "exists"
}

exports.logout = async ctx => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  })
  ctx.status = 204
}
