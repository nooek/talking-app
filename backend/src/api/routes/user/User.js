const express = require("express")
const route = express.Router()
const authenticateUser = require("../../helpers/tokenAuth")
const controller = require("../../controllers/UserController")

route.get("/getuser", authenticateUser, controller.getUser)

route.delete("/", controller.deleteUser)

module.exports = route