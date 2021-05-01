const express = require("express")
const route = express.Router()
const controller = require("../../controllers/FriendsController")

route.put("/", controller.blockFriend)

module.exports = route