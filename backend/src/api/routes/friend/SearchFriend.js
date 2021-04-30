const express = require("express")
const route = express.Router()
const controller = require("../../controllers/FriendsController")

route.get("/:me/:name", controller.findFriend)

module.exports = route