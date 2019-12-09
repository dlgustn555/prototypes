const Joi = require("joi")
const Account = require("../../models/account")

exports.localRegister = async ctx => {
  ctx.body = "register"
}

exports.localLogin = async ctx => {
  ctx.body = "login"
}

exports.exists = async ctx => {
  ctx.body = "exists"
}

exports.logout = async ctx => {
  ctx.body = "logout"
}
