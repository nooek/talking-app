const express = require("express")
const route = express.Router()
const controller = require("../../controllers/UserController")

route.post("/", controller.register)

module.exports = route