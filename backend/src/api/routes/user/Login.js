const express = require("express")
const route = express.Router()
const controller = require("../../controllers/UserController")
const cookieParser = require("cookie-parser")

route.use(cookieParser())

route.post("/",  controller.login)

module.exports = route